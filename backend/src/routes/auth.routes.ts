import { Router } from "express";
import { AuthController } from "../modules/auth/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// POST /api/auth/register
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Iniciar sesión
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login exitoso
 * 401:
 * description: Credenciales inválidas
 */
// POST /api/auth/login
router.post("/login", AuthController.login);

// GET /api/auth/me
router.get("/me", authMiddleware, AuthController.me);

export default router;
