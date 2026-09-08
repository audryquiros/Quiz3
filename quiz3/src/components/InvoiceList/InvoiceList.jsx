import { useEffect, useState } from "react";

import {
  formatearFecha,
  obtenerEstadoFactura,
  obtenerTotalFactura,
} from "../../utils/invoiceUtils";

import "./InvoiceList.css";

function InvoiceList({ facturas, onSelect }) {
  const [vista, setVista] = useState(() => {
    return (
      localStorage.getItem(
        "factuflow_vista_facturas"
      ) || "lista"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "factuflow_vista_facturas",
      vista
    );
  }, [vista]);

  if (facturas.length === 0) {
    return (
      <section className="invoice-list-section">
        <div className="invoice-list-empty">
          <h2>No hay facturas registradas</h2>
          <p>
            Cuando crees una factura, aparecerá aquí.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="invoice-list-section">
      <div className="invoice-list-header">
        <div>
          <h2>Facturas registradas</h2>
          <p>
            Consulta las facturas creadas y su estado actual.
          </p>
        </div>

        <div className="invoice-list-controls">
          <span className="invoice-list-count">
            {facturas.length}{" "}
            {facturas.length === 1
              ? "factura"
              : "facturas"}
          </span>

          <div className="invoice-view-selector">
            <button
              type="button"
              className={`invoice-view-button ${
                vista === "lista"
                  ? "invoice-view-button-active"
                  : ""
              }`}
              onClick={() => setVista("lista")}
              aria-label="Mostrar facturas en lista"
              title="Vista de lista"
            >
              Lista
            </button>

            <button
              type="button"
              className={`invoice-view-button ${
                vista === "cuadros"
                  ? "invoice-view-button-active"
                  : ""
              }`}
              onClick={() => setVista("cuadros")}
              aria-label="Mostrar facturas en cuadros"
              title="Vista de cuadros"
            >
              Cuadros
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          vista === "lista"
            ? "invoice-list"
            : "invoice-grid"
        }
      >
        {facturas.map((factura) => {
          const estado =
            obtenerEstadoFactura(factura);

          return (
            <article
              className={
                vista === "lista"
                  ? "invoice-list-card"
                  : "invoice-grid-card"
              }
              key={factura.id}
            >
              <div className="invoice-list-main">
                <div className="invoice-list-number">
                  <span>Factura</span>
                  <strong>{factura.numero}</strong>
                </div>

                <div className="invoice-list-client">
                  <span>Cliente</span>
                  <strong>{factura.cliente}</strong>
                </div>

                <div className="invoice-list-date">
                  <span>Fecha de emisión</span>
                  <strong>
                    {formatearFecha(factura.fecha)}
                  </strong>
                </div>

                <div className="invoice-list-status">
                  <span>Estado</span>
                  <strong
                    className={`invoice-status-badge invoice-status-${estado.toLowerCase()}`}
                  >
                    {estado}
                  </strong>
                </div>

                <div className="invoice-list-total">
                  <span>Total</span>
                  <strong>
                    $
                    {obtenerTotalFactura(
                      factura
                    ).toFixed(2)}
                  </strong>
                </div>
              </div>

              <button
                className="invoice-list-button"
                type="button"
                onClick={() =>
                  onSelect(factura.id)
                }
              >
                Ver factura
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default InvoiceList; 