import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Invoice from "../../components/Invoice/Invoice";

import {
  getFactura,
  deleteFactura,
} from "../../services/invoiceService";

import "./InvoiceDetail.css";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [factura, setFactura] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const cargarFactura = async () => {
      try {
        const data = await getFactura(id);
        setFactura(data);
      } catch (error) {
        console.error(
          "Error al cargar la factura:",
          error
        );
      }
    };

    cargarFactura();
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  const handleDelete = async () => {
    const confirmar = window.confirm(
      "¿Estás segura de que quieres eliminar esta factura?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setEliminando(true);

      await deleteFactura(id);

      navigate("/");
    } catch (error) {
      console.error(
        "Error al eliminar la factura:",
        error
      );

      alert(
        "No se pudo eliminar la factura. Inténtalo nuevamente."
      );

      setEliminando(false);
    }
  };

  if (!factura) {
    return (
      <main className="invoice-detail-page">
        <div className="invoice-detail-container">
          <p className="invoice-detail-loading">
            Cargando factura...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="invoice-detail-page">
      <div className="invoice-detail-container">

        {/* BOTÓN VOLVER */}

        <div className="invoice-detail-back-container">
          <button
            className="invoice-detail-back-button"
            type="button"
            onClick={handleBack}
          >
            Volver a facturas
          </button>
        </div>

        {/* FACTURA */}

        <Invoice factura={factura} />

        {/* BOTÓN ELIMINAR */}

        <div className="invoice-detail-delete-container">
          <button
            className="invoice-detail-delete-button"
            type="button"
            onClick={handleDelete}
            disabled={eliminando}
          >
            {eliminando
              ? "Eliminando..."
              : "Eliminar factura"}
          </button>
        </div>

      </div>
    </main>
  );
}

export default InvoiceDetail;