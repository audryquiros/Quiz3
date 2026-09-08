import "./InvoiceList.css";

function InvoiceList({ facturas, onSelect }) {
  if (facturas.length === 0) {
    return (
      <section className="invoice-list-section">
        <div className="invoice-list-header">
          <h2>Facturas registradas</h2>
        </div>

        <div className="empty-state">
          <h3>Aún no tienes facturas</h3>

          <p>
            Crea tu primera factura para comenzar
            a organizar tus documentos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="invoice-list-section">
      <div className="invoice-list-header">
        <h2>Facturas registradas</h2>

        <span className="invoice-count">
          {facturas.length}{" "}
          {facturas.length === 1
            ? "factura"
            : "facturas"}
        </span>
      </div>

      <div className="invoice-cards">
        {facturas.map((factura) => (
          <article
            className="invoice-card"
            key={factura.id}
          >
            <div className="invoice-card-main">
              <div>
                <span className="invoice-label">
                  FACTURA
                </span>

                <h3>{factura.numero}</h3>
              </div>

              <strong className="invoice-total">
                ${Number(factura.total).toFixed(2)}
              </strong>
            </div>

            <div className="invoice-card-info">
              <div>
                <span>Cliente</span>

                <p>{factura.cliente}</p>
              </div>

              <div>
                <span>Fecha</span>

                <p>{factura.fecha}</p>
              </div>
            </div>

            <button
              className="view-invoice-button"
              type="button"
              onClick={() => onSelect(factura.id)}
            >
              Ver factura
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InvoiceList;