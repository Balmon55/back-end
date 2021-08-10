import Compra from "../models/compra.js";

const existeCompraById = async (id) => {
  const existe = await Compra.findById(id);

  if (!existe) throw new Error(`No existe una venta para este ID`);
};

export { existeCompraById };
