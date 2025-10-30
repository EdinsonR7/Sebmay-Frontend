import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { localProductService } from '../api/localProductService';

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await localProductService.getById(id);
        if (mounted) setInitial(p);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleUpdate = async (data) => {
    await localProductService.update(id, data);
    navigate('/');
  };

  if (!initial) return <p>Cargando...</p>;

  return (
    <section>
      <h2>Editar Producto</h2>
      <ProductForm initialValues={initial} onSubmit={handleUpdate} submitLabel="Actualizar" />
    </section>
  );
}
