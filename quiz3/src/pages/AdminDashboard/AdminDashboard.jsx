import { useEffect, useMemo, useState } from "react";

import { getFacturas } from "../../services/invoiceService";

import {
  obtenerTotalFactura,
  parseFecha,
  calcularDesviacionEstandar,
  obtenerEstadoFactura,
} from "../../utils/invoiceUtils";

import MetricCard from "../../components/MetricCard/MetricCard";
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import ClientChart from "../../components/ClientChart/ClientChart";
import AnomalyPanel from "../../components/AnomalyPanel/AnomalyPanel";
import StatusPanel from "../../components/StatusPanel/StatusPanel";
import ProjectionPanel from "../../components/ProjectionPanel/ProjectionPanel";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [facturas, setFacturas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarFacturas = async () => {
      try {
        const data = await getFacturas();

        setFacturas(data);
      } catch (error) {
        console.error(
          "Error al cargar las facturas:",
          error
        );
      } finally {
        setCargando(false);
      }
    };

    cargarFacturas();
  }, []);

  const metricas = useMemo(() => {
    // ==========================================
    // TOTAL FACTURADO
    // ==========================================

    const totalFacturado = facturas.reduce(
      (suma, factura) =>
        suma + obtenerTotalFactura(factura),
      0
    );

    // ==========================================
    // NÚMERO DE FACTURAS
    // ==========================================

    const numeroFacturas = facturas.length;

    // ==========================================
    // TICKET PROMEDIO
    // ==========================================

    const ticketPromedio =
      numeroFacturas > 0
        ? totalFacturado / numeroFacturas
        : 0;

    // ==========================================
    // FACTURACIÓN POR CLIENTE
    // ==========================================

    const clientes = {};

    facturas.forEach((factura) => {
      const cliente =
        factura.cliente || "Sin cliente";

      const total =
        obtenerTotalFactura(factura);

      if (!clientes[cliente]) {
        clientes[cliente] = 0;
      }

      clientes[cliente] += total;
    });

    const topClientes = Object.entries(clientes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const facturacionPorCliente =
      Object.entries(clientes)
        .map(([cliente, facturacion]) => ({
          cliente,
          facturacion,
        }))
        .sort(
          (a, b) =>
            b.facturacion - a.facturacion
        );

    // ==========================================
    // INGRESOS POR PERÍODO
    // ==========================================

    const ingresosPorPeriodo = {};

    facturas.forEach((factura) => {
      const fecha = parseFecha(factura.fecha);

      if (!fecha) {
        return;
      }

      const año = fecha.getFullYear();
      const mes = fecha.getMonth();

      const clave = `${año}-${String(
        mes + 1
      ).padStart(2, "0")}`;

      const nombreMes =
        fecha.toLocaleDateString("es-ES", {
          month: "short",
        });

      if (!ingresosPorPeriodo[clave]) {
        ingresosPorPeriodo[clave] = {
          periodo: `${nombreMes} ${año}`,
          ingresos: 0,
          clave,
        };
      }

      ingresosPorPeriodo[clave].ingresos +=
        obtenerTotalFactura(factura);
    });

    const ingresosPorPeriodoArray =
      Object.values(ingresosPorPeriodo).sort(
        (a, b) =>
          a.clave.localeCompare(b.clave)
      );

    // ==========================================
    // ANOMALÍAS
    // ==========================================

    const totalesFacturas = facturas.map(
      (factura) =>
        obtenerTotalFactura(factura)
    );

    const promedioAnomalias =
      totalesFacturas.length > 0
        ? totalesFacturas.reduce(
            (suma, total) =>
              suma + total,
            0
          ) / totalesFacturas.length
        : 0;

    const desviacionEstandar =
      calcularDesviacionEstandar(
        totalesFacturas
      );

    const umbralAnomalia =
      promedioAnomalias +
      1.5 * desviacionEstandar;

    const cantidadAnomalias =
      totalesFacturas.filter(
        (total) => total > umbralAnomalia
      ).length;

    // ==========================================
    // ESTADOS
    // ==========================================

    const estados = {
      Pagada: 0,
      Pendiente: 0,
      Vencida: 0,
    };

    facturas.forEach((factura) => {
      const estado =
        obtenerEstadoFactura(factura);

      if (estados[estado] !== undefined) {
        estados[estado]++;
      }
    });

    // ==========================================
    // PROYECCIÓN
    // ==========================================

    let promedioMovil = 0;

    if (ingresosPorPeriodoArray.length > 0) {
      const periodosRecientes =
        ingresosPorPeriodoArray.slice(-3);

      promedioMovil =
        periodosRecientes.reduce(
          (suma, periodo) =>
            suma + periodo.ingresos,
          0
        ) / periodosRecientes.length;
    }

    // ==========================================
    // PRÓXIMO PERÍODO
    // ==========================================

    let periodoProyectado = "Próximo período";

    if (ingresosPorPeriodoArray.length > 0) {
      const ultimoPeriodo =
        ingresosPorPeriodoArray[
          ingresosPorPeriodoArray.length - 1
        ];

      const [año, mes] =
        ultimoPeriodo.clave
          .split("-")
          .map(Number);

      const siguienteFecha = new Date(
        año,
        mes,
        1
      );

      periodoProyectado =
        siguienteFecha.toLocaleDateString(
          "es-ES",
          {
            month: "long",
            year: "numeric",
          }
        );

      periodoProyectado =
        periodoProyectado.charAt(0).toUpperCase() +
        periodoProyectado.slice(1);
    }

    return {
      totalFacturado,
      numeroFacturas,
      ticketPromedio,
      topClientes,
      facturacionPorCliente,
      ingresosPorPeriodo:
        ingresosPorPeriodoArray,

      promedioAnomalias,
      desviacionEstandar,
      umbralAnomalia,
      cantidadAnomalias,

      estados,

      promedioMovil,
      periodoProyectado,
    };
  }, [facturas]);

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  if (cargando) {
    return (
      <main className="admin-dashboard-page">
        <div className="admin-dashboard-container">
          <p className="dashboard-loading">
            Cargando dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-container">

        {/* ENCABEZADO */}
        <section className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              ADMINISTRACIÓN
            </span>

            <h1>Dashboard</h1>

            <p>
              Resumen y análisis de la facturación.
            </p>
          </div>
        </section>

        {/* MÉTRICAS */}
        <section className="dashboard-metrics">

          <MetricCard
            titulo="Total facturado"
            valor={formatCurrency(
              metricas.totalFacturado
            )}
            descripcion="Facturación acumulada"
          />

          <MetricCard
            titulo="Número de facturas"
            valor={metricas.numeroFacturas}
            descripcion="Facturas registradas"
          />

          <MetricCard
            titulo="Ticket promedio"
            valor={formatCurrency(
              metricas.ticketPromedio
            )}
            descripcion="Promedio por factura"
          />

          <MetricCard
            titulo="Top 3 clientes"
            valor={metricas.topClientes}
            ranking={true}
            descripcion="Por facturación acumulada"
            />

        </section>

        {/* GRÁFICOS */}
        <section className="dashboard-charts">

          <RevenueChart
            datos={metricas.ingresosPorPeriodo}
          />

          <ClientChart
            datos={
              metricas.facturacionPorCliente
            }
          />

        </section>

        {/* ESTADOS */}
        <section className="dashboard-analysis">

          <StatusPanel
            pagadas={metricas.estados.Pagada}
            pendientes={
              metricas.estados.Pendiente
            }
            vencidas={
              metricas.estados.Vencida
            }
          />

        </section>

        {/* ANOMALÍAS */}
        <section className="dashboard-analysis">

          <AnomalyPanel
            facturas={facturas}
            promedio={
              metricas.promedioAnomalias
            }
            desviacion={
              metricas.desviacionEstandar
            }
            umbral={
              metricas.umbralAnomalia
            }
            cantidadAnomalias={
              metricas.cantidadAnomalias
            }
          />

        </section>

        {/* PROYECCIÓN */}
        <section className="dashboard-analysis">

          <ProjectionPanel
            promedioMovil={
              metricas.promedioMovil
            }
            periodo={
              metricas.periodoProyectado
            }
          />

        </section>

      </div>
    </main>
  );
}

export default AdminDashboard;