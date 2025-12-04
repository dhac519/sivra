import { Router } from "express";
import { MarcasController } from "./marcas.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.get("/", MarcasController.getAll);
router.post("/", MarcasController.create);

export default router;