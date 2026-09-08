import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const { usuarioActual, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div
        className="navbar-brand"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo.png"
          alt="FactuFlow"
          className="navbar-logo"
        />

        <div className="navbar-brand-text">
          <span className="navbar-name">FactuFlow</span>
          <span className="navbar-description">
            Gestión de facturas
          </span>
        </div>
      </div>

      <nav className="navbar-actions">

        {usuarioActual?.rol === "admin" && (
          <button
            className="navbar-button"
            type="button"
            onClick={() => navigate("/admin")}
          >
            Panel administrativo
          </button>
        )}

        <button
          className="navbar-button"
          type="button"
          onClick={() => navigate("/crear")}
        >
          Nueva factura
        </button>

        <button
          className="navbar-logout"
          type="button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

export default NavBar;