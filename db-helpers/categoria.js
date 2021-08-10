import Categoria from "../models/categoria.js"

const existeCategoriaById = async(id) => {
    const existe = await Categoria.findById(id)
    
    if(! existe) throw new Error (`No existe Categoria para este ID ${id}`)

}

const existeCategoriaByIdNombre = async (nombre) => {
    const existe = await Categoria.findOne({ nombre })
    
    if(existe)throw new Error("ya existe esa categoria con ese Nombre")

}

export {existeCategoriaById, existeCategoriaByIdNombre };