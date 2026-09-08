import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Invoice from "../../components/Invoice/Invoice";

import { getFactura } from "../../services/invoiceService";

import "./InvoiceDetail.css";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [factura, setFactura] = useState(null);

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

        <div className="back-container">
          <button
            className="back-button"
            type="button"
            onClick={handleBack}
          >
           Volver a facturas
          </button>
        </div>

        <Invoice factura={factura} />

      </div>
    </main>
  );
}

export default InvoiceDetail;