import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList"; 
import CreateProduct from "./components/CreateProduct"; 

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;