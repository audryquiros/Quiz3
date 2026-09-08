import "./MetricCard.css";

function MetricCard({
  titulo,
  valor,
  descripcion,
  ranking = false,
}) {
  return (
    <article className="metric-card">
      <span className="metric-card-title">
        {titulo}
      </span>

      {ranking ? (
        <div className="metric-card-ranking">
          {valor.length > 0 ? (
            valor.map(([cliente], index) => (
              <div
                className="metric-card-ranking-item"
                key={cliente}
              >
                <span className="metric-card-ranking-position">
                  {index + 1}
                </span>

                <span className="metric-card-ranking-name">
                  {cliente}
                </span>
              </div>
            ))
          ) : (
            <span className="metric-card-empty">
              Sin datos
            </span>
          )}
        </div>
      ) : (
        <strong className="metric-card-value">
          {valor}
        </strong>
      )}

      {descripcion && (
        <span className="metric-card-description">
          {descripcion}
        </span>
      )}
    </article>
  );
}

export default MetricCard;