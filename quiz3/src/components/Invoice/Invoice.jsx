import "./Invoice.css";

function Invoice({ factura }) {
  if (!factura) {
    return (
      <section className="invoice-loading">
        <p>Cargando factura...</p>
      </section>
    );
  }

  const subtotal = factura.items.reduce(
    (total, item) =>
      total +
      Number(item.cantidad) * Number(item.precio),
    0
  );

  const impuesto =
    subtotal * (Number(factura.impuesto) / 100);

  const total = subtotal + impuesto;

  return (
    <section className="invoice">

      {/* ENCABEZADO */}

      <header className="invoice-header">

        <div className="invoice-company">
          <h1>{factura.empresa}</h1>
          <p>ID Fiscal: {factura.idFiscal}</p>
        </div>

        <div className="invoice-title">
          <span>FACTURA</span>
          <h2>{factura.numero}</h2>
        </div>

      </header>

      {/* INFORMACIÓN */}

      <div className="invoice-info">

        <div className="invoice-client">
          <span>FACTURADO A</span>

          <h3>{factura.cliente}</h3>

          <p>{factura.direccion}</p>
        </div>

        <div className="invoice-date">
          <span>FECHA DE EMISIÓN</span>

          <p>{factura.fecha}</p>
        </div>

      </div>

      {/* PRODUCTOS */}

      <div className="invoice-items">

        <h3>Detalle de la factura</h3>

        <table>

          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {factura.items.map((item) => {

              const itemTotal =
                Number(item.cantidad) *
                Number(item.precio);

              return (
                <tr key={item.id}>

                  <td>{item.descripcion}</td>

                  <td>{item.cantidad}</td>

                  <td>
                    ${Number(item.precio).toFixed(2)}
                  </td>

                  <td>
                    ${itemTotal.toFixed(2)}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* TOTALES */}

      <div className="invoice-totals">

        <div className="total-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="total-row">
          <span>
            Impuesto ({factura.impuesto}%)
          </span>

          <span>
            ${impuesto.toFixed(2)}
          </span>
        </div>

        <div className="total-row total-final">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>

      {/* PIE */}

      <footer className="invoice-footer">
        <p>Gracias por su compra.</p>
      </footer>

    </section>
  );
}

export default Invoice;