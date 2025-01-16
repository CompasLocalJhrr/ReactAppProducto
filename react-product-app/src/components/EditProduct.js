import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Aquí puedes cargar los datos del producto por ID
    console.log(`Cargar datos para el producto con ID: ${id}`);
    setName("Producto de ejemplo"); // Simulación de datos cargados
    setPrice(100);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto actualizado:", { id, name, price });
    // Lógica para actualizar el producto en el backend
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditProduct;