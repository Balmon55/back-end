import Router from "express";
import {
  categoriaGet,
  categoriaPost,
  categoriaById,
  categoriaPut,
  categoriaActivar,
  categoriaDesactivar,
  categoriaDelete,
} from "../controllers/categoria.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
  existeCategoriaById,
  existeCategoriaByIdNombre,
} from "../db-helpers/categoria.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import validator from "express-validator";
const { check } = validator;
const router = Router();

router.get("/", [validarJWT], categoriaGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaById),
    validarCampos,
  ],
  categoriaById
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(existeCategoriaByIdNombre),
    validarCampos,
  ],
  categoriaPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaById),
    check("nombre").custom(existeCategoriaByIdNombre),
    validarCampos,
  ],
  categoriaPut
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaById),
    validarCampos,
  ],
  categoriaActivar
);

router.put(
  "/desactivar/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaById),
    validarCampos,
  ],
  categoriaDesactivar
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaById),
    validarCampos,
  ],
  categoriaDelete
);

export default router;
