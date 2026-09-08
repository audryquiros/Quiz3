import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import { getFacturas } from "../../services/invoiceService";

import "./Home.css";

function Home() {
  const [facturas, setFacturas] = useState([]);
  const navigate = useNavigate();
  const { usuarioActual } = useAuth();

  useEffect(() => {
    const cargarFacturas = async () => {
      try {
        const data = await getFacturas();
        setFacturas(data);
      } catch (error) {
        console.error(
          "Error al cargar las facturas:",
          error
        );
      }
    };

    cargarFacturas();
  }, []);

  const handleSelect = (id) => {
    navigate(`/factura/${id}`);
  };

  return (
    <main className="home-page">
      <section className="home-intro">
        <div className="home-intro-content">
          <div className="home-intro-text">
            <span className="home-eyebrow">
              PANEL DE FACTURACIÓN
            </span>

            <h1>Tus facturas</h1>

            <p>
              Consulta y administra tus facturas
              registradas.
            </p>
          </div>

          <div className="home-welcome">
            <span className="home-welcome-label">
              Bienvenido,
            </span>

            <strong>
              {usuarioActual?.usuario}
            </strong>

            <span className="home-welcome-role">
              {usuarioActual?.rol === "admin"
                ? "Administrador"
                : "Empleado"}
            </span>
          </div>
        </div>
      </section>

      <InvoiceList
        facturas={facturas}
        onSelect={handleSelect}
      />
    </main>
  );
}

export default Home;