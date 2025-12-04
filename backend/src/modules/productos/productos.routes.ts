import { Router } from "express";
import { ProductosController } from "./productos.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.get("/", ProductosController.getAll);
router.get("/:id", ProductosController.getOne);
router.post("/", ProductosController.create);

export default router;