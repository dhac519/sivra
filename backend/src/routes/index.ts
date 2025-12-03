import { Router } from "express";
import authRoutes from "./auth.routes";
// aquí después: import usuariosRoutes from "./usuarios.routes"; etc.

const router = Router();

router.use("/auth", authRoutes);
// router.use("/usuarios", usuariosRoutes);

export default router;
