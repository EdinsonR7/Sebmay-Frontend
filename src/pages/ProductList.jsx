import { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../api/productosApi";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
      await deleteProducto(id);
      loadProductos();
    }
  };

  return (
    <div className="app-main">
      <h2>Lista de Productos</h2>
      <Link to="/productos/new" className="btn">+ Nuevo</Link>
      <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{p.tipo}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>{p.proveedor}</td>
              <td>
                <Link to={`/productos/${p.id}`} className="btn small">Ver</Link>
                <Link to={`/productos/${p.id}/edit`} className="btn small">Editar</Link>
                <button onClick={() => handleDelete(p.id)} className="btn small danger">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
