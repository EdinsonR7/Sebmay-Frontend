/**
 * localProductService
 * - Simula un servicio REST en el frontend usando localStorage.
 * - Los métodos devuelven Promises para simular latencia y facilitar integraciones.
 *
 * Estructura del producto:
 * { id, nombre, descripcion, categoria, tipo, precio, stock, proveedor, estado, fecha_creacion }
 */

const STORAGE_KEY = 'sebmay_products_v1';

/** Obtener datos iniciales si no existen */
function initialSeed() {
  return [
    {
      id: 1,
      nombre: 'Shampoo Herbal',
      descripcion: 'Shampoo natural 500ml',
      categoria: 'Cuidado personal',
      tipo: 'producto',
      precio: 15000,
      stock: 25,
      proveedor: 'Distribuidora Natura',
      estado: 'activo',
      fecha_creacion: new Date().toISOString(),
    },
    {
      id: 2,
      nombre: 'Mantenimiento general',
      descripcion: 'Servicio técnico básico',
      categoria: 'Servicios',
      tipo: 'servicio',
      precio: 50000,
      stock: 0,
      proveedor: 'SebMay Solutions',
      estado: 'activo',
      fecha_creacion: new Date().toISOString(),
    },
  ];
}

/** Leer desde localStorage o inicializar */
function readStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = initialSeed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    const seed = initialSeed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
}

/** Guardar array en localStorage */
function writeStorage(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/** Generar id incremental */
function nextId(items) {
  if (!items.length) return 1;
  return Math.max(...items.map(i => i.id)) + 1;
}

/** Simular latencia */
function delay(ms = 200) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const localProductService = {
  async getAll() {
    await delay();
    return readStorage();
  },

  async getById(id) {
    await delay();
    const items = readStorage();
    return items.find(p => p.id === Number(id)) || null;
  },

  async create(payload) {
    await delay();
    const items = readStorage();
    const id = nextId(items);
    const newItem = {
      id,
      nombre: payload.nombre || 'Sin nombre',
      descripcion: payload.descripcion || '',
      categoria: payload.categoria || '',
      tipo: payload.tipo || 'producto',
      precio: Number(payload.precio) || 0,
      stock: Number(payload.stock) || 0,
      proveedor: payload.proveedor || '',
      estado: payload.estado || 'activo',
      fecha_creacion: new Date().toISOString(),
    };
    items.push(newItem);
    writeStorage(items);
    return newItem;
  },

  async update(id, payload) {
    await delay();
    const items = readStorage();
    const idx = items.findIndex(i => i.id === Number(id));
    if (idx === -1) throw new Error('No encontrado');
    const updated = { ...items[idx], ...payload, id: Number(id) };
    items[idx] = updated;
    writeStorage(items);
    return updated;
  },

  async remove(id) {
    await delay();
    let items = readStorage();
    items = items.filter(i => i.id !== Number(id));
    writeStorage(items);
    return { message: 'Eliminado' };
  },

  // Opcional: buscar por nombre (case-insensitive)
  async search(query) {
    await delay();
    const items = readStorage();
    const q = String(query || '').toLowerCase();
    return items.filter(i => i.nombre.toLowerCase().includes(q));
  }
};
