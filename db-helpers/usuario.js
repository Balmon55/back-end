import Usuario from "../models/usuario.js"

const existeUsuarioById=async(id)=> {
    
    const existe = await Usuario.findById(id)
    
    if(! existe) throw new Error(`No exite usuario para este ID ${id}`)

}

const existeUsuarioByIdNombre = async (nombre) => {
    const existe = await Usuario.findOne({ nombre })
    if(existe) throw new Error("Ya existe un usuario con ese Nombre")

}

export { existeUsuarioById, existeUsuarioByIdNombre }
