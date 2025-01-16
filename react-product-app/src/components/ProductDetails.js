import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Aquí puedes cargar los detalles del producto por ID
    console.log(`Cargar detalles para el producto con ID: ${id}`);
    setProduct({ id, name: "Producto de ejemplo", price: 100 }); // Simulación de datos cargados
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles del Producto</h2>
      <p>ID: {product.id}</p>
      <p>Nombre: {product.name}</p>
      <p>Precio: {product.price}</p>
    </div>
  );
};

export default ProductDetails;