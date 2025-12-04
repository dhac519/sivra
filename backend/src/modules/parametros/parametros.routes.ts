import { Router } from "express";
import { ParametrosController } from "./parametros.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", ParametrosController.getAll);
router.post("/", ParametrosController.save);
export default router;