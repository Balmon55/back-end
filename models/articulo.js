import mongoose from "mongoose";

const articuloSchema = mongoose.Schema({
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoria",
    required: true,
  },
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  codigo: { type: String, required: true, maxlength: 64, unique: true },
  descripcion: { type: String, maxlength: 255 },
  precioventa: { type: Number, required: true, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("articulo", articuloSchema);
