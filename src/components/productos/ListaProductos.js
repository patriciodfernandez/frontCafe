import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import ItemProducto from "./ItemProducto";
import { withRouter } from "react-router";

const ListaProductos = ({ productos, consultarApi }) => {
  console.log("lista en listaprod", productos);
  return (
    <div>
      <Container className="my-5">
        <h1 className="text-center mb-5">Lista de productos</h1>
        <ListGroup>
          {productos.map((producto) => (
            <ItemProducto
              producto={producto}
              consultarApi={consultarApi}
              key={producto._id}
            ></ItemProducto>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default withRouter(ListaProductos);
