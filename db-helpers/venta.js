import Venta from "../models/venta.js";

const existeVentaById = async (id) => {
  const existe = await Venta.findById(id);

  if (!existe) throw new Error(`No existe una venta para este ID`);
};
export { existeVentaById };
