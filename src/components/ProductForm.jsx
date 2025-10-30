import { useState } from 'react';

/**
 * ProductForm: formulario controlado reutilizable para crear/editar.
 * Props:
 * - initialValues: objeto con valores iniciales (para editar)
 * - onSubmit: función async que procesa el submit y retorna resultado
 * - submitLabel: texto del botón (Crear / Actualizar)
 */
export default function ProductForm({ initialValues = {}, onSubmit, submitLabel = 'Guardar' }) {
  const [form, setForm] = useState({
    nombre: initialValues.nombre || '',
    descripcion: initialValues.descripcion || '',
    categoria: initialValues.categoria || '',
    tipo: initialValues.tipo || 'producto',
    precio: initialValues.precio || '',
    stock: initialValues.stock || '',
    proveedor: initialValues.proveedor || '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Maneja cambios en inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // Submit del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Validación mínima
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      console.error(err);
      setError('Error procesando formulario');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label>Nombre</label>
        <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <input className="form-control" name="categoria" value={form.categoria} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Tipo</label>
        <select className="form-control" name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="producto">Producto</option>
          <option value="servicio">Servicio</option>
        </select>
      </div>

      <div className="row">
        <div className="form-group col">
          <label>Precio</label>
          <input type="number" step="0.01" className="form-control" name="precio" value={form.precio} onChange={handleChange} />
        </div>
        <div className="form-group col">
          <label>Stock</label>
          <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Proveedor</label>
        <input className="form-control" name="proveedor" value={form.proveedor} onChange={handleChange} />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
