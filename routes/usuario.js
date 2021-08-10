import Router from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  existeUsuarioById,
  existeUsuarioByIdNombre,
} from "../db-helpers/usuario.js";
import {
  usuarioGet,
  usuarioById,
  usuarioPost,
  usuarioPut,
  usuarioActivar,
  usuarioDesactivar,
  login,
} from "../controllers/usuario.js";
import validator from "express-validator";
const { check } = validator;

const router = Router();

router.get("/", usuarioGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuarioById
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(existeUsuarioByIdNombre),
    validarCampos,
  ],
  usuarioPost
);

router.post("/login", login);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("nombre").custom(existeUsuarioByIdNombre),
    validarCampos,
  ],
  usuarioPut
);

router.put(
  "/activar/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuarioActivar
);

router.put(
  "/desactivar/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuarioDesactivar
);

export default router;
