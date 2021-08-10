import Compra from "../models/compra.js";
import modificarStock from "../db-helpers/modificarStock.js";
const compraGet = async (req, res) => {
  const { value } = req.query;
  const compra = await Compra.find({})
    .sort({ createdAt: -1 })
    .populate("usuario", ["nombre", "email"])
    .populate("persona", ["nombre", "tipoDocumento"]);

  res.json({
    compra,
  });
};
const compraPost = async (req, res) => {
  const {
    usuario,
    persona,
    tipoComprobante,
    serieComprobante,
    numComprobante,
    total,
    impuesto,
    detalles,
  } = req.body;
  const compra = new Compra({
    usuario,
    persona,
    tipoComprobante,
    serieComprobante,
    numComprobante,
    total,
    impuesto,
    detalles,
  });

  compra.total = compra.detalles.reduce(
    (acc, articulos) => acc + articulos.cantidad * articulos.precio,
    0
  );

  compra.impuesto = compra.total * 0.19;
  await compra.save();
  detalles.map((articulos) =>
    modificarStock.disminuirStock(articulos._id, articulos.cantidad)
  );
  res.json({
    compra,
  });
};
const compraById = async (req, res) => {
  const { id } = req.params;
  const compra = await Compra.findOne({ _id: id })
    .populate("usuarios", ["nombre", "email"])
    .populate("personas ", ["nombre", "tipoDocumento"]);

  res.json({
    compra,
  });
};

const compraPut = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, __v, estado, ...resto } = req.body;
  const compra = await Compra.findByIdAndUpdate(id, resto);

  res.json({
    compra,
  });
};

const compraActivar = async (req, res) => {
  const { id } = req.params;
  const compra = await Compra.findByIdAndUpdate(id, { estado: 1 });
  compra.detalles.map((articulos) =>
    modificarStock.disminuirStock(articulos._id, articulos.cantidad)
  );
  res.json({
    compra,
  });
};

const compraDesactivar = async (req, res) => {
  const { id } = req.params;
  const compra = await Compra.findByIdAndUpdate(id, { estado: 0 });
  compra.detalles.map((articulos) =>
    modificarStock.aumentarStock(articulos._id, articulos.cantidad)
  );
  res.json({
    compra,
  });
};

const compraDelete = async (req, res) => {
  const { id } = req.params;
  const compra = await Compra.findByIdAndDelete(id);

  res.json({
    compra,
  });
};

export {
  compraGet,
  compraPost,
  compraById,
  compraPut,
  compraActivar,
  compraDesactivar,
  compraDelete,
};
