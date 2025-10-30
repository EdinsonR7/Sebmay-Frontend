import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductNew from './pages/ProductNew';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetail';

/**
 * App: Router principal del módulo de productos/servicios para SebMay.
 * - Cumple con estándares: PascalCase en componentes, camelCase en funciones.
 * - Comentarios explicativos en funciones clave.
 */
export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>SebMay — Gestión de Productos / Servicios</h1>
        <nav>
          <Link to="/" className="nav-link">Productos</Link>
          <Link to="/productos/new" className="nav-link btn">Nuevo</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/productos/new" element={<ProductNew />} />
          <Route path="/productos/:id/edit" element={<ProductEdit />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}
