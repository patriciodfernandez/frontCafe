import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import { useParams } from "react-router";
import { campoRequerido, rangoValor } from "../helpers/validaciones";

const EditarProducto = ({ consultarApi, history, match }) => {
  const { id } = useParams();
  console.log("match.params.id", match.params.id);
  const URL = process.env.REACT_APP_API_URL;
  console.log(URL);
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState("");

  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef(0);

  useEffect(() => {
    consultarProducto();
  }, []);

  const consultarProducto = async () => {
    try {
      const respuesta = await fetch(URL + "/" + id);
      console.log(respuesta);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        setProducto(resultado);
        console.log(producto);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [error, setError] = useState(false);

  const cambiarCategoria = (e) => {
    setCategoria(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriaSeleccionada =
      categoria === "" ? producto.categoria : categoria;

    if (
      campoRequerido(nombreProductoRef.current.value) &&
      rangoValor(parseInt(precioProductoRef.current.value)) &&
      campoRequerido(categoriaSeleccionada)
    ) {
      const productoEditado = {
        nombreProducto: nombreProductoRef.current.value,
        precioProducto: precioProductoRef.current.value,
        categoria: categoriaSeleccionada,
      };
      console.log(productoEditado);

      try {
        const respuesta = await fetch(URL + "/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoEditado),
        });
        console.log(respuesta);
        if (respuesta.status === 200) {
          Swal.fire(
            "Producto editado ",
            "Los datos del producto fueron modificados",
            "success"
          );
          history.push("/productos");
          consultarApi();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("ERROR NO enviar datos");
    }
  };
  return (
    <div>
      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="my-3 text-center">Editar un producto</h1>
          <Form.Group>
            {error === true ? (
              <Alert variant="danger">Todos los campos son obligatorios </Alert>
            ) : null}
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Submarino"
              defaultValue={producto.nombreProducto}
              ref={nombreProductoRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio </Form.Label>
            <Form.Control
              type="number"
              placeholder="$25.60"
              defaultValue={producto.precioProducto}
              ref={precioProductoRef}
            ></Form.Control>
          </Form.Group>
          <div className="text-center my-4">
            <h3>Categoría</h3>

            <Form.Check
              type="radio"
              label="Bebida caliente "
              name="categoria"
              inline
              onChange={cambiarCategoria}
              value="bebida-caliente"
              defaultChecked={
                producto.categoria && producto.categoria === "bebida-caliente"
              }
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Bebida fria "
              name="categoria"
              value="bebida-fria"
              onChange={cambiarCategoria}
              inline
              defaultChecked={
                producto.categoria && producto.categoria === "bebida-fria"
              }
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Sanwich"
              inline
              value="sandwich"
              onChange={cambiarCategoria}
              name="categoria"
              defaultChecked={
                producto.categoria && producto.categoria === "sandwich"
              }
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Dulce"
              inline
              value="dulce"
              onChange={cambiarCategoria}
              name="categoria"
              defaultChecked={
                producto.categoria && producto.categoria === "dulce"
              }
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Salado"
              inline
              value="salado"
              onChange={(e) => setCategoria(e.target.value)}
              name="categoria"
              defaultChecked={
                producto.categoria && producto.categoria === "salado"
              }
            ></Form.Check>
          </div>
          <button type="submit " className="w-100 ">
            {" "}
            Editar producto
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(EditarProducto);
