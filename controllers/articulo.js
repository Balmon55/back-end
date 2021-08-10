import Articulo from "../models/articulo.js";
const articuloGet = async (req, res) => {
  const articulo = await Articulo.find().populate("categoria", "nombre");
  res.json({
    articulo,
  });
};

const articuloPost = async (req, res) => {
  const {
    codigo,
    categoria,
    nombre,
    descripcion,
    precioventa,
    stock,
  } = req.body;
  const articulo = new Articulo({
    codigo,
    categoria,
    nombre,
    descripcion,
    precioventa,
    stock,
  });

  await articulo.save();

  res.json({
    articulo,
  });
};

const articuloById = async (req, res) => {
  const { id } = req.params;
  const articulo = await Articulo.findOne({ _id: id });
  res.json({
    articulo,
  });
};

const articuloPut = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, _v, estado, ...resto } = req.body;
  const articulo = await Articulo.findByIdAndUpdate(id, resto);

  res.json({
    articulo,
  });
};

const articuloActivar = async (req, res) => {
  const { id } = req.params;
  const articulo = await Articulo.findByIdAndUpdate(id, { estado: 1 });

  res.json({
    articulo,
  });
};

const articuloDesactivar = async (req, res) => {
  const { id } = req.params;
  const articulo = await Articulo.findByIdAndUpdate(id, { estado: 0 });

  res.json({
    articulo,
  });
};

const articuloDelete = async (req, res) => {
  const { id } = req.params;
  const articulo = await Articulo.findOneAndDelete(id);
  res.json({
    articulo,
  });
};

export {
  articuloGet,
  articuloPost,
  articuloById,
  articuloPut,
  articuloActivar,
  articuloDesactivar,
  articuloDelete,
};
