import Persona from "../models/persona.js";

const personaGet = async (req, res) => {
    const persona = await Persona.find() 
    res.json({
        persona,
    });
};

const personaPost = async (req, res) => {
  const {tipoPersona,nombre,documento,Iddocumento,direccion,telefono,email,} = req.body;
  const persona = new Persona({tipoPersona,nombre,documento,Iddocumento,direccion,telefono,email});
  await persona.save();
  res.json({
    persona,
  });
};

const personaById = async (req, res) => {
  const { id } = req.params;
  const persona = await Persona.findOne({ _id: id });
  res.json({
    persona
  });
};
const personaPut = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, _v, estado, ...resto } = req.body;
  const persona = await Persona.findByIdAndUpdate(id, resto);

  res.json({
    persona,
  });

};

const personaActivar = async (req, res) => {
  const { id } = req.params;
  const persona = await Persona.findByIdAndUpdate(id, { estado: 1 });

  res.json({
    persona,
  });
};

const personaDesactivar = async (req, res) => {
  const { id } = req.params;
  const persona = await Persona.findByIdAndUpdate(id, { estado: 0 });

  res.json({
    persona,
  });
};

const personaDelete = async (req, res) => {
const { id } = req.params;
const persona = await Persona.findOneAndDelete(id);
res.json({
  persona,
});
};






export {
  personaGet,
  personaPost,
  personaById,
  personaPut,
  personaActivar,
  personaDesactivar,
  personaDelete,
};