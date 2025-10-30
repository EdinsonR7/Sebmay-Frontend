import axios from 'axios';

// Usa la variable de entorno o localhost por defecto
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/productos';

// Instancia de axios
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// CRUD completo
export async function getProductos() {
  const res = await api.get('/');
  return res.data;
}

export async function getProductoById(id) {
  const res = await api.get(`/${id}`);
  return res.data;
}

export async function createProducto(data) {
  const res = await api.post('/', data);
  return res.data;
}

export async function updateProducto(id, data) {
  const res = await api.put(`/${id}`, data);
  return res.data;
}

export async function deleteProducto(id) {
  const res = await api.delete(`/${id}`);
  return res.data;
}
