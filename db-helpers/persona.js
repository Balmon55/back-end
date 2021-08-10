import Persona from "../models/persona.js";

const existePersonaById = async (id) => {
  const existe = await Persona.findById(id);

  if (!existe) throw new Error(`No existe persona para este ID ${id}`);
};
const existePersonaByNombre = async (nombre) => {
  const existe = await Persona.findOne({ nombre });

  if (existe) throw Error("Ya existe una persona con ese nombre");
};
export { existePersonaById, existePersonaByNombre };
