import "./AnomalyPanel.css";

function AnomalyPanel({
  facturas,
  promedio,
  desviacion,
  umbral,
  cantidadAnomalias,
}) {
  const facturasConEstado = facturas.map((factura) => {
    const total = Number(factura.total || 0);

    return {
      ...factura,
      totalCalculado: total,
      esAnomalia: total > umbral,
    };
  });

  return (
    <section className="anomaly-panel">
      <div className="anomaly-header">
        <div>
          <h2>Detección de anomalías</h2>

          <p>
            Facturas con valores significativamente
            superiores al comportamiento habitual.
          </p>
        </div>

        <div className="anomaly-count">
          <span>Anomalías detectadas</span>

          <strong>{cantidadAnomalias}</strong>
        </div>
      </div>

      <div className="anomaly-summary">
        <div className="anomaly-summary-item">
          <span>Promedio</span>

          <strong>
            ${promedio.toFixed(2)}
          </strong>
        </div>

        <div className="anomaly-summary-item">
          <span>Desviación estándar</span>

          <strong>
            ${desviacion.toFixed(2)}
          </strong>
        </div>

        <div className="anomaly-summary-item">
          <span>Umbral de anomalía</span>

          <strong>
            ${umbral.toFixed(2)}
          </strong>
        </div>
      </div>

      <div className="anomaly-list">
        {facturasConEstado.length === 0 ? (
          <p className="anomaly-empty">
            No hay facturas registradas.
          </p>
        ) : (
          facturasConEstado.map((factura) => (
            <div
              className={`anomaly-item ${
                factura.esAnomalia
                  ? "anomaly-item-alert"
                  : ""
              }`}
              key={factura.id}
            >
              <div className="anomaly-item-info">
                <strong>
                  {factura.numero}
                </strong>

                <span>
                  {factura.cliente ||
                    "Sin cliente"}
                </span>
              </div>

              <div className="anomaly-item-total">
                <strong>
                  ${factura.totalCalculado.toFixed(2)}
                </strong>

                {factura.esAnomalia && (
                  <span className="anomaly-badge">
                    Anomalía
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AnomalyPanel;