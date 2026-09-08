import "./ProjectionPanel.css";

function ProjectionPanel({
  promedioMovil,
  periodo,
}) {
  return (
    <section className="projection-panel">
      <div className="projection-content">
        <div className="projection-info">
          <span className="projection-eyebrow">
            PROYECCIÓN
          </span>

          <h2>Ingresos estimados</h2>

          <p>
            Proyección del próximo período basada
            en el promedio de los ingresos recientes.
          </p>
        </div>

        <div className="projection-value">
          <span>Estimación para</span>

          <strong>
            {periodo}
          </strong>

          <b>
            ${promedioMovil.toFixed(2)}
          </b>

          <small>
            Promedio móvil
          </small>
        </div>
      </div>
    </section>
  );
}

export default ProjectionPanel; 