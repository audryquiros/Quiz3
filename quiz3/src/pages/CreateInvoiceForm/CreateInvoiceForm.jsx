import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";
import {
  createFactura,
  getFacturas,
} from "../../services/invoiceService";

import "./CreateInvoiceForm.css";

function CreateInvoiceForm() {
  const navigate = useNavigate();

  const [numeroFactura, setNumeroFactura] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generarNumeroFactura = async () => {
      try {
        const facturas = await getFacturas();

        let mayorNumero = 0;

        facturas.forEach((factura) => {
          const numero = String(factura.numero || "");

          const numeroSinFormato = parseInt(
            numero.replace("FAC-", ""),
            10
          );

          if (!isNaN(numeroSinFormato)) {
            mayorNumero = Math.max(
              mayorNumero,
              numeroSinFormato
            );
          }
        });

        const siguienteNumero = mayorNumero + 1;

        const numeroFormateado = `FAC-${String(
          siguienteNumero
        ).padStart(3, "0")}`;

        setNumeroFactura(numeroFormateado);
      } catch (error) {
        console.error(
          "Error al generar el número de factura:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    generarNumeroFactura();
  }, []);

  const handleSave = async (factura) => {
    try {
      await createFactura(factura);

      navigate("/");
    } catch (error) {
      console.error(
        "Error al crear la factura:",
        error
      );
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <main className="create-invoice-page">
        <div className="create-invoice-container">
          <p className="loading-message">
            Preparando nueva factura...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="create-invoice-page">

      <div className="create-invoice-container">

        <div className="back-container">
          <button
            className="back-button"
            type="button"
            onClick={handleBack}
          >
            Volver a facturas
          </button>
        </div>

        <header className="page-header">
          <span className="page-eyebrow">
            NUEVA FACTURA
          </span>

          <h1>Crear factura</h1>

          <p>
            Completa la información para registrar
            una nueva factura.
          </p>
        </header>

        <InvoiceForm
          numeroFactura={numeroFactura}
          onSave={handleSave}
        />

      </div>

    </main>
  );
}

export default CreateInvoiceForm;