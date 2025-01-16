import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Compas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link as={Link} to="/ProductList">Listar Productos</Nav.Link>
              <Nav.Link as={Link} to="/CreateProduct">Crear Producto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 

export default NavbarComponent; 