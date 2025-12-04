import { Router } from "express";
import { CategoriasController } from "./categorias.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware); // Protegemos todas las rutas

router.get("/", CategoriasController.getAll);
router.post("/", CategoriasController.create);

export default router;