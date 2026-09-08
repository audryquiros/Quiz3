import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const inicioExitoso = login(
      usuario,
      contraseña
    );

    if (!inicioExitoso) {
      setError(
        "Usuario o contraseña incorrectos."
      );

      return;
    }

    const rutaAnterior =
      location.state?.from || "/";

    navigate(rutaAnterior, {
      replace: true,
    });
  };

  return (
    <main className="login-page">
      <section className="login-card">

        <div className="login-header">
          <div className="login-logo">
            <img
              src="/logo.png"
              alt="FactuFlow"
            />
          </div>

          <h1>FactuFlow</h1>

          <p>
            Gestión de facturas
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="login-field">
            <label htmlFor="usuario">
              Usuario
            </label>

            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) =>
                setUsuario(e.target.value)
              }
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="contraseña">
              Contraseña
            </label>

            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) =>
                setContraseña(e.target.value)
              }
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            className="login-button"
            type="submit"
          >
            Iniciar sesión
          </button>

            <div className="login-test-users">
            <p>Usuarios de prueba</p>

            <div className="login-test-user">
                <strong>Administrador</strong>
                <span>Usuario: admin</span>
                <span>Contraseña: admin123</span>
            </div>

            <div className="login-test-user">
                <strong>Empleado</strong>
                <span>Usuario: empleado</span>
                <span>Contraseña: 1234</span>
            </div>
            </div>

        </form>

      </section>
    </main>
  );
}

export default Login;