import Router from "express";
import {
  articuloGet,
  articuloPost,
  articuloById,
  articuloPut,
  articuloActivar,
  articuloDesactivar,
  articuloDelete,
} from "../controllers/articulo.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
  existeArticuloById,
  existeArticuloByIdNombre,
  existeArticuloByCodigo,
} from "../db-helpers/articulo.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import validator from "express-validator";
const { check } = validator;
const router = Router();

router.get("/", [validarJWT], articuloGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos,
  ],
  articuloById
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(existeArticuloByIdNombre),
    check("codigo").custom(existeArticuloByCodigo),
    validarCampos,
  ],
  articuloPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeArticuloById),
    check("nombre").custom(existeArticuloByIdNombre),
    check("codigo").custom(existeArticuloByCodigo),
    validarCampos,
  ],
  articuloPut
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos,
  ],
  articuloActivar
);

router.put(
  "/desactivar/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos,
  ],
  articuloDesactivar
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos,
  ],
  articuloDelete
);

export default router;
