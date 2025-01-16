import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importar los componentes para las operaciones CRUD
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar"; // Importar el componente NavBar
import DeleteProduct from "./components/DeleteProduct";

const App = () => {
  return (
    <Router>
      <div>
      <Navbar/>
        <h1>Gestión de Productos</h1>
        {/* Configuración de rutas */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/delete/:id" element={<DeleteProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;