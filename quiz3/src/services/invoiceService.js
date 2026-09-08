  const API_URL = "http://localhost:3001/facturas";

  export const getFacturas = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener las facturas");
    }

    return response.json();
  };

  export const getFactura = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Factura no encontrada");
    }

    return response.json();
  };

  export const createFactura = async (factura) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(factura),
    });

    if (!response.ok) {
      throw new Error("Error al crear la factura");
    }

    return response.json();
  };