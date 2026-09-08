import "./StatusPanel.css";

function StatusPanel({
  pagadas,
  pendientes,
  vencidas,
}) {
  return (
    <section className="status-panel">
      <div className="status-panel-header">
        <div>
          <h2>Estado de facturación</h2>

          <p>
            Resumen de las facturas según su estado
            actual.
          </p>
        </div>
      </div>

      <div className="status-cards">

        <div className="status-card status-paid">
          <span className="status-card-label">
            Pagadas
          </span>

          <strong className="status-card-value">
            {pagadas}
          </strong>

          <span className="status-card-description">
            Facturas pagadas
          </span>
        </div>

        <div className="status-card status-pending">
          <span className="status-card-label">
            Pendientes
          </span>

          <strong className="status-card-value">
            {pendientes}
          </strong>

          <span className="status-card-description">
            Aún dentro del plazo
          </span>
        </div>

        <div className="status-card status-overdue">
          <span className="status-card-label">
            Vencidas
          </span>

          <strong className="status-card-value">
            {vencidas}
          </strong>

          <span className="status-card-description">
            Fuera de la fecha límite
          </span>
        </div>

      </div>
    </section>
  );
}

export default StatusPanel;