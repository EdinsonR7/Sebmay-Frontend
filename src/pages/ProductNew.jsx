import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProducto } from "../api/productosApi";

export default function ProductNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    tipo: "producto",
    precio: "",
    stock: "",
    proveedor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProducto(formData);
    navigate("/");
  };

  return (
    <div className="app-main">
      <h2 className="nuevo-producto">Nuevo Producto</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === "precio" || key === "stock" ? "number" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit" className="btn">Crear</button>
        </div>
      </form>
    </div>
  );
}
