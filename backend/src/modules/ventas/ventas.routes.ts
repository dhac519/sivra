import { Router } from "express";
import { VentasController } from "./ventas.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", VentasController.getAll);
router.post("/", VentasController.create);
export default router;