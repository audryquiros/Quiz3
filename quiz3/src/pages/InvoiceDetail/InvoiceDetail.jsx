import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Invoice from "../../components/Invoice/Invoice";

import {
  getFactura,
  deleteFactura,
  updateFactura,
} from "../../services/invoiceService";

import { obtenerEstadoFactura } from "../../utils/invoiceUtils";

import "./InvoiceDetail.css";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [factura, setFactura] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [actualizandoEstado, setActualizandoEstado] = useState(false);

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

  const handleMarkAsPaid = async () => {
    try {
      setActualizandoEstado(true);

      const facturaActualizada = await updateFactura(id, {
        pagada: true,
      });

      setFactura(facturaActualizada);
    } catch (error) {
      console.error(
        "Error al actualizar el estado:",
        error
      );

      alert(
        "No se pudo actualizar el estado de la factura. Inténtalo nuevamente."
      );
    } finally {
      setActualizandoEstado(false);
    }
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

  const estado = obtenerEstadoFactura(factura);

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

        {/* ESTADO DE LA FACTURA */}
        <section className="invoice-status-card">
          <div className="invoice-status-info">
            <span className="invoice-status-label">
              Estado de la factura
            </span>

            <strong
              className={`invoice-status invoice-status-${estado.toLowerCase()}`}
            >
              {estado}
            </strong>
          </div>

          {estado !== "Pagada" && (
            <button
              className="invoice-paid-button"
              type="button"
              onClick={handleMarkAsPaid}
              disabled={actualizandoEstado}
            >
              {actualizandoEstado
                ? "Actualizando..."
                : "Marcar como pagada"}
            </button>
          )}
        </section>

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