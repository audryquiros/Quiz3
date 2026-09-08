import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./RevenueChart.css";

function RevenueChart({ datos }) {
  return (
    <section className="revenue-chart-card">
      <div className="chart-header">
        <h2>Ingresos por período</h2>

        <p>
          Facturación acumulada por mes.
        </p>
      </div>

      <div className="revenue-chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={datos}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="periodo"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "#cbd5e1",
              }}
              tickLine={{
                stroke: "#cbd5e1",
              }}
            />

            <YAxis
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "#cbd5e1",
              }}
              tickLine={{
                stroke: "#cbd5e1",
              }}
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toFixed(2)}`,
                "Ingresos",
              ]}
              contentStyle={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 15px rgba(0, 0, 0, 0.08)",
              }}
            />

            <Bar
              dataKey="ingresos"
              name="Ingresos"
              fill="#4f46e5"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default RevenueChart;