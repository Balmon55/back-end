import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  documento:{type: String, maxlength: 50, required: true },
  Iddocumento:{type: Number, maxlength: 15, required: true, unique: true },
  direccion: { type: String, required: true, maxlength: 50, unique: true },
  telefono: { type: Number, required: true, maxlength: 15, unique: true },
  email: { type: String, required: true, maxlength: 100, unique: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  rol: { type: String, required: true, maxlength: 20 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("usuario", usuarioSchema);
