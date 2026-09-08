import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goCreateInvoice = () => {
    navigate("/crear");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">

        <button
          className="navbar-brand"
          onClick={goHome}
          type="button"
        >
          <img
            src="/logo.png"
            alt="FactuFlow"
            className="navbar-logo"
          />

          <div className="navbar-brand-text">
            <span className="navbar-name">
              FactuFlow
            </span>

            <span className="navbar-description">
              Gestión de facturas
            </span>
          </div>
        </button>

        <button
          className="navbar-create"
          onClick={goCreateInvoice}
          type="button"
        >
          Nueva factura
        </button>

      </div>
    </nav>
  );
}

export default Navbar;