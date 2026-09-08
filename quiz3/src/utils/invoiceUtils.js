export const parseFecha = (fecha) => {
  if (!fecha) return null;

  const valor = String(fecha);

  // Formato DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
    const [dia, mes, año] = valor.split("/").map(Number);

    return new Date(año, mes - 1, dia);
  }

  // Formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [año, mes, dia] = valor.split("-").map(Number);

    return new Date(año, mes - 1, dia);
  }

  return null;
};


export const formatearFecha = (fecha) => {
  const fechaConvertida = parseFecha(fecha);

  if (!fechaConvertida) return "";

  const dia = String(fechaConvertida.getDate()).padStart(2, "0");
  const mes = String(fechaConvertida.getMonth() + 1).padStart(2, "0");
  const año = fechaConvertida.getFullYear();

  return `${dia}/${mes}/${año}`;
};


export const obtenerFechaActual = () => {
  const hoy = new Date();

  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const año = hoy.getFullYear();

  return `${dia}/${mes}/${año}`;
};


export const obtenerFechaVencimiento = (dias = 30) => {
  const fecha = new Date();

  fecha.setDate(fecha.getDate() + dias);

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const año = fecha.getFullYear();

  return `${dia}/${mes}/${año}`;
};


export const obtenerEstadoFactura = (factura) => {
  // Una factura pagada siempre aparece como Pagada
  if (factura?.pagada) {
    return "Pagada";
  }

  const fechaVencimiento = parseFecha(
    factura?.fechaVencimiento
  );

  if (!fechaVencimiento) {
    return "Pendiente";
  }

  const hoy = new Date();

  hoy.setHours(0, 0, 0, 0);
  fechaVencimiento.setHours(0, 0, 0, 0);

  if (fechaVencimiento < hoy) {
    return "Vencida";
  }

  return "Pendiente";
};


export const obtenerTotalFactura = (factura) => {
  if (typeof factura?.total === "number") {
    return factura.total;
  }

  const subtotal = (factura?.items || []).reduce(
    (total, item) =>
      total +
      Number(item.cantidad || 0) *
      Number(item.precio || 0),
    0
  );

  const impuesto =
    subtotal * (Number(factura?.impuesto || 0) / 100);

  return subtotal + impuesto;
};


export const calcularDesviacionEstandar = (valores) => {
  if (!valores.length) {
    return 0;
  }

  const promedio =
    valores.reduce(
      (suma, valor) => suma + valor,
      0
    ) / valores.length;

  const varianza =
    valores.reduce(
      (suma, valor) =>
        suma + Math.pow(valor - promedio, 2),
      0
    ) / valores.length;

  return Math.sqrt(varianza);
};