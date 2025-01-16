import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log(`Producto con ID: ${id} eliminado`);
    // Lógica para eliminar el producto en el backend
    navigate("/"); // Redirige a la lista de productos después de eliminar
  };

  return (
    <div>
      <h2>Eliminar Producto</h2>
      <p>¿Estás seguro de que deseas eliminar el producto con ID: {id}?</p>
      <button onClick={handleDelete}>Sí, eliminar</button>
      <button onClick={() => navigate("/")}>Cancelar</button>
    </div>
  );
};

export default DeleteProduct;