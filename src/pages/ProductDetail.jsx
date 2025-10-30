import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { localProductService } from '../api/localProductService';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await localProductService.getById(id);
        if (mounted) setProduct(p);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <section className="detail">
      <h2>{product.nombre}</h2>
      <p><strong>Descripción:</strong> {product.descripcion}</p>
      <p><strong>Categoría:</strong> {product.categoria}</p>
      <p><strong>Tipo:</strong> {product.tipo}</p>
      <p><strong>Precio:</strong> {product.precio}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Proveedor:</strong> {product.proveedor}</p>

      <Link to={`/productos/${product.id}/edit`} className="btn">Editar</Link>
      <Link to="/" className="btn secondary">Volver</Link>
    </section>
  );
}
