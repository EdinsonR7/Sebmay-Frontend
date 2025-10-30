import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { localProductService } from '../api/localProductService';

/**
 * ProductList: muestra la tabla de productos/servicios.
 * - Usa localProductService para CRUD (simula API REST).
 * - Maneja estados: loading, error.
 */

export default function ProductList() {
  const [products, setProducts] = useState([]); // array de productos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos al montar
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await localProductService.getAll();
        if (mounted) setProducts(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError('Error cargando productos');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar producto?')) return;
    try {
      await localProductService.remove(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="list-container">
      <h2>Productos y Servicios</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Categoría</th><th>Tipo</th><th>Precio</th><th>Stock</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr><td colSpan="7">No hay productos</td></tr>
          )}
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td><Link to={`/productos/${p.id}`}>{p.nombre}</Link></td>
              <td>{p.categoria}</td>
              <td>{p.tipo}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <Link to={`/productos/${p.id}/edit`} className="btn small">Editar</Link>
                <button className="btn danger small" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
