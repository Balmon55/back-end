import Router from "express";
import {
  compraGet,
  compraPost,
  compraById,
  compraPut,
  compraActivar,
  compraDesactivar,
} from "../controllers/compra.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeCompraById } from "../db-helpers/compra.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import validator from "express-validator";
const { check } = validator;

const router = Router();

router.get("/", [validarJWT, validarCampos], compraGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos,
  ],
  compraById
);

router.post(
  "/",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos,
  ],
  compraPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos,
  ],
  compraPut
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos,
  ],
  compraActivar
);

router.put(
  "/desactivar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos,
  ],
  compraDesactivar
);

export default router;
