import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ClientChart.css";

function ClientChart({ datos }) {
  return (
    <section className="client-chart-card">
      <div className="chart-header">
        <h2>Facturación por cliente</h2>

        <p>
          Distribución de ingresos acumulados por cliente.
        </p>
      </div>

      <div className="client-chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={datos}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="cliente"
              width={100}
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toFixed(2)}`,
                "Facturación",
              ]}
            />

            <Bar
            dataKey="facturacion"
            name="Facturación"
            fill="#8b5cf6"
            radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ClientChart;