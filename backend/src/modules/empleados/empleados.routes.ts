import { Router } from "express";
import { EmpleadosController } from "./empleados.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

// Todas las rutas requieren estar logueado
router.use(authMiddleware);

router.get("/", EmpleadosController.getAll);           // Listar todos
router.get("/:dni", EmpleadosController.getByDni);     // Buscar uno
router.post("/registrar", EmpleadosController.registrar); // Crear nuevo (Auto-Usuario)
router.put("/:id", EmpleadosController.update);        // Editar contacto

export default router;