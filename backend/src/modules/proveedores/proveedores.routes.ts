import { Router } from "express";
import { ProveedoresController } from "./proveedores.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

// Todas las rutas protegidas
router.use(authMiddleware);

router.get("/", ProveedoresController.getAll);
router.post("/", ProveedoresController.create);

export default router;