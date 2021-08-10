import Router from "express";
import {
  ventaGet,
  ventaPost,
  ventaById,
  ventaPut,
  ventaActivar,
  ventaDesactivar,
} from "../controllers/venta.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeVentaById } from "../db-helpers/venta.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import validator from "express-validator";
const { check } = validator;

const router = Router();

router.get("/", [validarJWT, validarCampos], ventaGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeVentaById),
    validarCampos,
  ],
  ventaById
);

router.post(
  "/",
  [
    validarJWT,
    validarCampos,
  ],
  ventaPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeVentaById),
    validarCampos,
  ],
  ventaPut
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeVentaById),
    validarCampos,
  ],
  ventaActivar
);

router.put(
  "/desactivar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeVentaById),
    validarCampos,
  ],
  ventaDesactivar
);

export default router;
