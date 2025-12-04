import { Router } from "express";
import { PagosController } from "./pagos.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.get("/", PagosController.getAll); // Ver todos los pagos (para Contabilidad)
router.post("/", PagosController.create); // Registrar nuevo pago
router.get("/empleado/:idEmpleado", PagosController.getByEmpleado); // Ver historial de uno

export default router;