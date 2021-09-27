import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemProducto = ({ producto, consultarApi, history }) => {
  const eliminarProducto = (id) => {
    const URL = process.env.REACT_APP_API_URL + "/" + id;

    console.log(URL);
    Swal.fire({
      title: "¿Estas seguro que deseas eliminar el producto?",
      text: "No podras recuperar el producto eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          });

          if (respuesta.status === 200) {
            Swal.fire(
              "Producto eliminado!",
              "El producto seleccionado fue eliminado",
              "success"
            );
            consultarApi();
          } else {
            Swal.fire("Se produjo un erro", "Intentelo de nuevo", "success");
          }

          history.push("/productos");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <p>
          {producto.nombreProducto}
          <span className="font-weight-bold"> ${producto.precioProducto}</span>
        </p>

        <div>
          <Link
            to={`/productos/editar/${producto._id} `}
            className="btn btn-warning mr-2 text-light"
          >
            <FontAwesomeIcon icon={faPenSquare}></FontAwesomeIcon>
          </Link>
          <Button
            variant="danger"
            className="me-2"
            onClick={() => eliminarProducto(producto._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </Button>
        </div>
      </ListGroup.Item>
    </div>
  );
};

export default ItemProducto;
