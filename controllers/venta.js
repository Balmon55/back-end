import Venta from "../models/venta.js";
import modificarStock from "../db-helpers/modificarStock.js";

const ventaGet = async (req, res) => {
  const venta = await Venta.find()
    .populate("usuario", ["nombre", "email"])
    .populate("persona", ["nombre", "documento"]);
  res.json({
    venta,
  });
};

const ventaPost = async (req, res) => {
  const {
    usuario,
    persona,
    tipoComprobante,
    serieComprobante,
    numComprobante,
    impuesto,
    total,
    detalles,
  } = req.body;
  const venta = new Venta({
    usuario,
    persona,
    tipoComprobante,
    serieComprobante,
    numComprobante,
    impuesto,
    total,
    detalles,
  });

  venta.total = venta.detalles.reduce(
    (acc, articulos) =>
      acc + (articulos.cantidad * articulos.precio - articulos.descuento),
    0
  );

  venta.impuesto = venta.total * 0.19;

  await venta.save();
  detalles.map((articulos) =>
    modificarStock.disminuirStock(articulos._id, articulos.cantidad)
  );
  res.json({
    venta,
  });
};

const ventaById = async (req, res) => {
  const { id } = req.params;
  const venta = await Venta.findOne({ _id: id })
    .populate("usuarios", ["nombre", "email"])
    .populate("personas ", ["nombre", "tipoDocumento"]);

  res.json({
    venta,
  });
};

const ventaPut = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, __v, estado, ...resto } = req.body;
  const venta = await Venta.findByIdAndUpdate(id, resto);
  res.json({
    venta,
  });
};

const ventaActivar = async (req, res) => {
  const { id } = req.params;
  const venta = await Venta.findByIdAndUpdate(id, { estado: 1 });
  venta.detalles.map((articulos) =>
    modificarStock.disminuirStock(articulos._id, articulos.cantidad)
  );
  res.json({
    venta,
  });
};

const ventaDesactivar = async (req, res) => {
  const { id } = req.params;
  const venta = await Venta.findByIdAndUpdate(id, { estado: 0 });
  venta.detalles.map((articulos) =>
    modificarStock.aumentarStock(articulos._id, articulos.cantidad)
  );
  res.json({
    venta,
  });
};

const ventaDelete = async (req, res) => {
  const { id } = req.params;
  const venta = await Venta.findByIdAndDelete(id);

  res.json({
    venta,
  });
};

export {
  ventaGet,
  ventaPost,
  ventaById,
  ventaPut,
  ventaActivar,
  ventaDesactivar,
  ventaDelete,
};
