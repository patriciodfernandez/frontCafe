import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter } from "react-router";

const AgregarProductos = (props) => {
  const URL = process.env.REACT_APP_API_URL;

  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const cambiarCategoria = (e) => {
    setCategoria(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria === ""
    ) {
      setError(true);
      return;
    } else {
      setError(false);

      // crear objeto
      const datos = {
        nombreProducto: nombreProducto,
        precioProducto: precioProducto,
        categoria: categoria,
      };
      console.log(datos);

      // ENVIAR OBJETO A LA API POOST
      try {
        const parametros = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(datos),
        };

        const respuesta = await fetch(URL, parametros);
        console.log(respuesta);
        if ((await respuesta.status) === 201) {
          Swal.fire(
            "Producto agregado",
            "Se carga un nuevo producto en la cafeteria",
            "success"
          );

          // limpiar form

          // setNombreProducto("");
          // setPrecioProducto("");
          // setCategoria("");

          // recargar productos
          props.consultarApi();

          props.history.push("/productos");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Container className="my-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="my-3 text-center">Agregar un producto</h1>
          <Form.Group>
            {error === true ? (
              <Alert variant="danger">Todos los campos son obligatorios </Alert>
            ) : null}
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Submarino"
              onChange={(e) => setNombreProducto(e.target.value)}
              value={nombreProducto}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio </Form.Label>
            <Form.Control
              type="number"
              placeholder="$25.60"
              onChange={(e) => setPrecioProducto(e.target.value)}
              value={precioProducto}
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
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Bebida fria "
              name="categoria"
              value="bebida-fria"
              onChange={cambiarCategoria}
              inline
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Sanwich"
              inline
              value="sandwich"
              onChange={cambiarCategoria}
              name="categoria"
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Dulce"
              inline
              value="dulce"
              onChange={cambiarCategoria}
              name="categoria"
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Salado"
              inline
              value="salado"
              onChange={(e) => setCategoria(e.target.value)}
              name="categoria"
            ></Form.Check>
          </div>
          <button type="submit " className="w-100 ">
            {" "}
            Enviar
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(AgregarProductos);
