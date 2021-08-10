import mongoose from "mongoose";

const personaSchema = mongoose.Schema({
  tipoPersona: { type: String, required: true, maxlength: 50 },
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  documento:{type: String, maxlength: 50, required: true },
  Iddocumento:{type: Number, maxlength: 15, required: true, unique: true },
  direccion: { type: String, required: true, maxlength: 50, unique: true },
  telefono: { type: Number, required: true, maxlength: 15, unique: true },
  email: { type: String, required: true, maxlength: 100, unique: true },
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("persona", personaSchema);
