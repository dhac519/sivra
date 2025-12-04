import { Router } from "express";
import { CajaController } from "./caja.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.post("/aperturar", CajaController.aperturar);
router.post("/cerrar", CajaController.cerrar);
router.get("/historial", CajaController.getHistorial);

export default router;