import { Router } from "express";
import { ComprasController } from "./compras.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/", ComprasController.getAll);
router.post("/", ComprasController.create);

export default router;