import Router from "express";
import {
  personaGet,
  personaPost,
  personaById,
  personaPut,
  personaActivar,
  personaDesactivar,
} from "../controllers/persona.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existePersonaById, existePersonaByNombre } from "../db-helpers/persona.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import validator from "express-validator";
const { check } = validator;
const router = Router();

router.get("/", [validarJWT,validarCampos,], personaGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existePersonaById),
    validarCampos,
  ],
  personaById
);

router.post(
  "/",
  [
    validarJWT,
    validarCampos,
  ],
  personaPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existePersonaById),
    check("nombre").custom(existePersonaByNombre),
    validarCampos,
  ],
  personaPut
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existePersonaById),
    validarCampos,
  ],
  personaActivar
);

router.put(
  "/desactivar/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existePersonaById),
    validarCampos,
  ],
  personaDesactivar
);

export default router;
