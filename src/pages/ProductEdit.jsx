// src/pages/ProductEdit.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getProductoById, updateProducto } from '../api/productosApi';

/**
 * ProductEdit - Página para editar un producto existente.
 * - Recupera el producto por ID al montar.
 * - Reutiliza ProductForm (props: initialValues, onSubmit).
 * - Redirige al listado al finalizar la actualización.
 */
export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos del producto al montar
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const producto = await getProductoById(id);
        // Normalizar/transformar si es necesario (ej: convertir numeros a string para inputs)
        const normalized = producto
          ? {
              nombre: producto.nombre ?? '',
              descripcion: producto.descripcion ?? '',
              categoria: producto.categoria ?? '',
              tipo: producto.tipo ?? 'producto',
              precio: producto.precio ?? '',
              stock: producto.stock ?? '',
              proveedor: producto.proveedor ?? '',
            }
          : null;

        if (mounted) setInitialValues(normalized);
      } catch (err) {
        console.error('Error cargando producto para editar:', err);
        if (mounted) setError('No se pudo cargar el producto.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  // Función que recibe los datos del formulario y actualiza el producto
  const handleUpdate = async (formData) => {
    try {
      setError(null);
      // Asegurar tipos correctos (opcional)
      const payload = {
        ...formData,
        precio: formData.precio === '' ? 0 : Number(formData.precio),
        stock: formData.stock === '' ? 0 : Number(formData.stock),
      };

      await updateProducto(id, payload);
      // Redirigir al listado o al detalle según prefieras
      navigate('/');
    } catch (err) {
      console.error('Error actualizando producto:', err);
      setError('Error al actualizar el producto. Intenta nuevamente.');
    }
  };

  if (loading) return <p>Cargando datos del producto...</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!initialValues) return <p>Producto no encontrado.</p>;

  return (
    <>
    <section className="app-main">
      <h2 className="nuevo-producto">Editar Producto</h2>
      <ProductForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        submitLabel="Actualizar"
      />
    </section>
    </>
  );
}
