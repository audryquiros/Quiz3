# FactuFlow

Sistema web de gestión, consulta y análisis de facturas desarrollado con React, Vite y JSON Server.

## Descripción

FactuFlow es una aplicación web que permite crear, registrar, consultar y analizar facturas.

La aplicación permite ingresar los datos del emisor y del cliente, agregar productos o servicios de forma dinámica, calcular automáticamente subtotal, impuesto y total, consultar el detalle de cada factura y gestionar su estado.

Además, FactuFlow incorpora un panel administrativo para analizar la facturación mediante métricas, gráficos, detección de facturas atípicas, estados de pago y una proyección de ingresos.

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- React Router
- Recharts
- JSON Server

---

## Funcionalidades

### Gestión de facturas

- Crear nuevas facturas.
- Generar automáticamente el número de factura.
- Generar automáticamente la fecha de emisión.
- Generar automáticamente la fecha de vencimiento.
- Ingresar los datos del emisor.
- Ingresar los datos del cliente.
- Agregar productos o servicios dinámicamente.
- Eliminar productos o servicios.
- Configurar el porcentaje de impuesto.
- Calcular automáticamente el subtotal.
- Calcular automáticamente el impuesto.
- Calcular automáticamente el total.
- Visualizar las facturas registradas.
- Consultar el detalle completo de una factura.
- Eliminar facturas.
- Marcar una factura como pagada.
- Mostrar el estado de cada factura.

### Autenticación y roles

FactuFlow cuenta con un sistema de inicio de sesión con dos roles:

- Administrador
- Empleado

El acceso a las rutas está protegido mediante React Router.

El panel administrativo está disponible únicamente para usuarios con rol de administrador.

### Panel administrativo

El Dashboard permite analizar las facturas registradas mediante información calculada dinámicamente a partir de los datos de JSON Server.

Las métricas incluyen:

- Total facturado.
- Número de facturas.
- Ticket promedio.
- Top 3 clientes por facturación.

### Gráficos

El Dashboard utiliza Recharts para representar:

- Ingresos por período.
- Facturación por cliente.

Los gráficos utilizan los datos reales de las facturas registradas y se actualizan cuando cambia la información.

### Detección de facturas atípicas

El sistema calcula:

- Promedio de los totales de las facturas.
- Desviación estándar.
- Umbral de anomalía.

El umbral utilizado es:

    promedio + (1.5 × desviación estándar)

Las facturas cuyo total supera este umbral son marcadas visualmente como anomalías.

El Dashboard también muestra la cantidad total de facturas detectadas como atípicas.

### Estados de las facturas

Cada factura cuenta con una fecha de vencimiento.

El estado se determina automáticamente utilizando la fecha actual:

- **Pagada:** la factura fue marcada como pagada.
- **Pendiente:** la fecha de vencimiento todavía no ha pasado.
- **Vencida:** la fecha de vencimiento ya pasó y la factura no ha sido marcada como pagada.

El Dashboard muestra el conteo de facturas en cada estado.

### Proyección de ingresos

El Dashboard incluye una proyección simple del ingreso esperado para el siguiente período.

La proyección utiliza un **promedio móvil simple de los últimos tres períodos disponibles**.

El cálculo funciona de la siguiente manera:

1. Se agrupan las facturas según su mes y año.
2. Se obtiene el ingreso total de cada período.
3. Se toman los últimos tres períodos disponibles.
4. Se calcula el promedio de sus ingresos.
5. El resultado se utiliza como estimación para el siguiente período.

Por ejemplo:

    Período 1 → $300
    Período 2 → $400
    Período 3 → $500

La proyección sería:

    ($300 + $400 + $500) / 3 = $400

La proyección se muestra claramente como una **estimación** y no como un ingreso real.

---

## Estructura del proyecto

```text
src/
├── components/
│   ├── AnomalyPanel/
│   │   ├── AnomalyPanel.jsx
│   │   └── AnomalyPanel.css
│   │
│   ├── ClientChart/
│   │   ├── ClientChart.jsx
│   │   └── ClientChart.css
│   │
│   ├── Invoice/
│   │   ├── Invoice.jsx
│   │   └── Invoice.css
│   │
│   ├── InvoiceForm/
│   │   ├── InvoiceForm.jsx
│   │   └── InvoiceForm.css
│   │
│   ├── InvoiceList/
│   │   ├── InvoiceList.jsx
│   │   └── InvoiceList.css
│   │
│   ├── MetricCard/
│   │   ├── MetricCard.jsx
│   │   └── MetricCard.css
│   │
│   ├── NavBar/
│   │   ├── NavBar.jsx
│   │   └── NavBar.css
│   │
│   ├── ProjectionPanel/
│   │   ├── ProjectionPanel.jsx
│   │   └── ProjectionPanel.css
│   │
│   ├── RevenueChart/
│   │   ├── RevenueChart.jsx
│   │   └── RevenueChart.css
│   │
│   └── StatusPanel/
│       ├── StatusPanel.jsx
│       └── StatusPanel.css
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── AdminDashboard/
│   │   ├── AdminDashboard.jsx
│   │   └── AdminDashboard.css
│   │
│   ├── CreateInvoiceForm/
│   │   ├── CreateInvoiceForm.jsx
│   │   └── CreateInvoiceForm.css
│   │
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   │
│   ├── InvoiceDetail/
│   │   ├── InvoiceDetail.jsx
│   │   └── InvoiceDetail.css
│   │
│   └── Login/
│       ├── Login.jsx
│       └── Login.css
│
├── routes/
│   └── AppRouter.jsx
│
├── services/
│   └── invoiceService.js
│
├── utils/
│   └── invoiceUtils.js
│
├── App.jsx
├── main.jsx
└── index.css
