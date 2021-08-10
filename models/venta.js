import mongoose from "mongoose";

const ventaSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario",
    required: true,
  },
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "persona",
    required: true,
  },
  tipoComprobante: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  serieComprobante: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  numComprobante: { type: String, required: true, default: 0 },
  impuesto: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
  detalles: [
    {
      _id: { type: String, required: true },
      articulo: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
      descuento: { type: Number, required: true },
    },
  ],
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("venta", ventaSchema);
