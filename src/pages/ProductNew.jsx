import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { localProductService } from '../api/localProductService';

/**
 * ProductNew: página para crear un nuevo producto (usa ProductForm).
 */
export default function ProductNew() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await localProductService.create(data);
    navigate('/'); // volver al listado
  };

  return (
    <section>
      <h2>Nuevo Producto / Servicio</h2>
      <ProductForm onSubmit={handleCreate} submitLabel="Crear" />
    </section>
  );
}
