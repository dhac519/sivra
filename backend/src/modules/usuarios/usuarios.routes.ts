import { Router } from "express";
import { UsuariosController } from "./usuarios.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.get("/", UsuariosController.getAll);
router.post("/", UsuariosController.create);

export default router;