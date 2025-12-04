import { Router } from "express";
import { ClientesController } from "./clientes.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", ClientesController.getAll);
router.post("/", ClientesController.create);
export default router;