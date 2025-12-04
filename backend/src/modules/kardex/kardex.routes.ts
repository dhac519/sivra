import { Router } from "express";
import { KardexController } from "./kardex.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

// Ver todo el historial
router.get("/", KardexController.getAll);

// Ver historial de un solo producto (ej: /api/kardex/producto/1)
router.get("/producto/:idProducto", KardexController.getByProduct);

export default router;