# FactuFlow

Sistema de gestión y visualización de facturas desarrollado con React.

## Descripción

FactuFlow es una aplicación web que permite crear, registrar y visualizar facturas de manera sencilla.

El sistema permite ingresar los datos del emisor y del cliente, agregar productos o servicios a una factura, calcular automáticamente el subtotal, el impuesto y el total, y consultar las facturas registradas.

## Tecnologías utilizadas

- React
- Vite
- React Router
- JavaScript
- CSS
- JSON Server

## Funcionalidades

- Crear nuevas facturas.
- Generar automáticamente el número de factura.
- Generar automáticamente la fecha de emisión.
- Ingresar los datos del emisor.
- Ingresar los datos del cliente.
- Agregar productos o servicios de forma dinámica.
- Eliminar productos o servicios.
- Calcular automáticamente el subtotal.
- Aplicar un porcentaje de impuesto configurable.
- Calcular automáticamente el total.
- Visualizar las facturas registradas.
- Consultar el detalle completo de una factura.
- Eliminar facturas.
- Mostrar un estado vacío cuando no existen facturas registradas.

## Estructura del proyecto

```text
src/
├── components/
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
│   └── NavBar/
│       ├── NavBar.jsx
│       └── NavBar.css
│
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   │
│   ├── CreateInvoiceForm/
│   │   ├── CreateInvoiceForm.jsx
│   │   └── CreateInvoiceForm.css
│   │
│   └── InvoiceDetail/
│       ├── InvoiceDetail.jsx
│       └── InvoiceDetail.css
│
├── routes/
│   └── AppRouter.jsx
│
├── services/
│   └── invoiceService.js
│
├── App.jsx
├── main.jsx
└── index.css
