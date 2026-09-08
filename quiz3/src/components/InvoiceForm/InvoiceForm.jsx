import {  useState } from "react";

import {
  obtenerFechaActual,
  obtenerFechaVencimiento,
} from "../../utils/invoiceUtils";

import "./InvoiceForm.css";

function InvoiceForm({ onSave, numeroFactura }) {
  const [formData, setFormData] = useState({
    empresa: "",
    idFiscal: "",
    cliente: "",
    direccion: "",
    numero: "",
    fecha: obtenerFechaActual(),
    fechaVencimiento: obtenerFechaVencimiento(30),
    pagada: false,
    impuesto: 13,
    items: [
      {
        id: "item-inicial",
        descripcion: "",
        cantidad: 1,
        precio: 0,
      },
    ],
  });

  // Actualizar el número de factura automáticamente
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (id, field, value) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "cantidad" || field === "precio"
                  ? Number(value)
                  : value,
            }
          : item
      ),
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: Date.now(),
          descripcion: "",
          cantidad: 1,
          precio: 0,
        },
      ],
    });
  };

  const removeItem = (id) => {
    // No permitir eliminar el último producto
    if (formData.items.length === 1) {
      return;
    }

    setFormData({
      ...formData,
      items: formData.items.filter(
        (item) => item.id !== id
      ),
    });
  };

  // Calcular subtotal
  const subtotal = formData.items.reduce(
    (total, item) =>
      total +
      Number(item.cantidad) * Number(item.precio),
    0
  );

  // Calcular impuesto
  const impuestoMonto =
    subtotal * (Number(formData.impuesto) / 100);

  // Calcular total
  const total = subtotal + impuestoMonto;

  // Formatear moneda
  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const factura = {
      ...formData,
      numero: numeroFactura,
      subtotal,
      impuestoMonto,
      total,
    };

    onSave(factura);
  };

  return (
    <form
      className="invoice-form"
      onSubmit={handleSubmit}
    >
      {/* INFORMACIÓN DE LA FACTURA */}
      <div className="invoice-meta">
        <div className="invoice-meta-item">
          <span className="invoice-meta-label">
            Número de factura
          </span>

          <strong className="invoice-meta-value">
            {numeroFactura}
          </strong>
        </div>

        <div className="invoice-meta-item">
          <span className="invoice-meta-label">
            Fecha de emisión
          </span>

          <strong className="invoice-meta-value">
            {formData.fecha}
          </strong>
        </div>

        <div className="invoice-meta-item">
          <span className="invoice-meta-label">
            Fecha de vencimiento
          </span>

          <strong className="invoice-meta-value">
            {formData.fechaVencimiento}
          </strong>
        </div>
      </div>

      {/* DATOS DEL EMISOR */}
      <h2 className="form-section-title">
        Datos del emisor
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Nombre de la empresa</label>

          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>RUC / NIT / ID Fiscal</label>

          <input
            type="text"
            name="idFiscal"
            value={formData.idFiscal}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* DATOS DEL CLIENTE */}
      <h2 className="form-section-title">
        Datos del cliente
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Nombre del cliente</label>

          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Dirección</label>

          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* ÍTEMS DE LA FACTURA */}
      <h2 className="form-section-title">
        Ítems de la factura
      </h2>

      <div className="items-container">
        <div className="items-header">
          <span>Descripción</span>
          <span>Cantidad</span>
          <span>Precio</span>
          <span></span>
        </div>

        {formData.items.map((item) => (
          <div
            className="item-row"
            key={item.id}
          >
            <input
              className="item-input"
              type="text"
              placeholder="Descripción"
              value={item.descripcion}
              onChange={(e) =>
                handleItemChange(
                  item.id,
                  "descripcion",
                  e.target.value
                )
              }
              required
            />

            <input
              className="item-input item-number"
              type="number"
              placeholder="Cantidad"
              min="1"
              value={item.cantidad}
              onChange={(e) =>
                handleItemChange(
                  item.id,
                  "cantidad",
                  e.target.value
                )
              }
              required
            />

            <input
              className="item-input item-number"
              type="number"
              placeholder="Precio"
              min="0"
              step="0.01"
              value={item.precio}
              onChange={(e) =>
                handleItemChange(
                  item.id,
                  "precio",
                  e.target.value
                )
              }
              required
            />

            <button
              className="delete-item-button"
              type="button"
              onClick={() => removeItem(item.id)}
              disabled={formData.items.length === 1}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* AGREGAR PRODUCTO */}
      <button
        className="add-item-button"
        type="button"
        onClick={addItem}
      >
        + Agregar producto
      </button>

      {/* RESUMEN */}
      <div className="invoice-summary">
        <div className="summary-row">
          <span>Subtotal</span>

          <strong>
            {formatCurrency(subtotal)}
          </strong>
        </div>

        <div className="summary-row">
          <span>
            Impuesto ({formData.impuesto}%)
          </span>

          <strong>
            {formatCurrency(impuestoMonto)}
          </strong>
        </div>

        <div className="summary-total">
          <span>Total</span>

          <strong>
            {formatCurrency(total)}
          </strong>
        </div>
      </div>

      {/* IMPUESTO Y GUARDAR */}
      <div className="form-footer">
        <div className="tax-container">
          <div className="form-group tax-field">
            <label>Impuesto (%)</label>

            <input
              type="number"
              name="impuesto"
              min="0"
              step="0.01"
              value={formData.impuesto}
              onChange={handleChange}
              required
            />
          </div>

          <p className="tax-description">
            Porcentaje de impuesto aplicado a la factura.
          </p>
        </div>

        <button
          className="save-invoice-button"
          type="submit"
        >
          Guardar factura
        </button>
      </div>
    </form>
  );
}

export default InvoiceForm;