import Articulo from "../models/articulo.js";

const existeArticuloById = async (id) => {
  const existe = await Articulo.findById(id);

  if (!existe) throw new Error(`No existe articulo para este ID ${id}`);
};

const existeArticuloByIdNombre = async (nombre) => {
  const existe = await Articulo.findOne({ nombre });

  if (existe) throw new Error("ya existe ese articulo con ese Nombre");
};

const existeArticuloByCodigo = async (codigo) => {
  const existe = await Articulo.findOne({ codigo });

  if (existe) throw Error("Ya existe un articulo con este código");
};

export { existeArticuloById, existeArticuloByIdNombre, existeArticuloByCodigo };
