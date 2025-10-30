import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductoById } from "../api/productosApi";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    getProductoById(id).then(setProducto);
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="app-main">
      <h2>{producto.nombre}</h2>
      <div className="card">
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Tipo:</strong> {producto.tipo}</p>
        <p><strong>Precio:</strong> {producto.precio}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>
        <p><strong>Proveedor:</strong> {producto.proveedor}</p>
        <div className="form-buttons">
          <Link to={`/productos/${producto.id}/edit`} className="btn">Editar</Link>
          <Link to="/" className="btn">Volver</Link>
        </div>
      </div>
    </div>
  );
}
