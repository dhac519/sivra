import { Router } from "express";
import authRoutes from "./auth.routes";
import categoriasRoutes from "../modules/categorias/categorias.routes";
import marcasRoutes from "../modules/marcas/marcas.routes";
import productosRoutes from "../modules/productos/productos.routes";
import proveedoresRoutes from "../modules/proveedores/proveedores.routes"; // Importar
import comprasRoutes from "../modules/compras/compras.routes";
import clientesRoutes from "../modules/clientes/clientes.routes";
import ventasRoutes from "../modules/ventas/ventas.routes";
import kardexRoutes from "../modules/kardex/kardex.routes";
import cajaRoutes from "../modules/caja/caja.routes";
import usuariosRoutes from "../modules/usuarios/usuarios.routes";
import parametrosRoutes from "../modules/parametros/parametros.routes";
import pagosRoutes from "../modules/pagos/pagos.routes";
import empleadosRoutes from "../modules/empleados/empleados.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/marcas", marcasRoutes);
router.use("/productos", productosRoutes);
router.use("/proveedores", proveedoresRoutes); // Agregar
router.use("/compras", comprasRoutes);
router.use("/clientes", clientesRoutes);
router.use("/ventas", ventasRoutes);
router.use("/kardex", kardexRoutes);
router.use("/caja", cajaRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/parametros", parametrosRoutes);
router.use("/pagos", pagosRoutes);
router.use("/empleados", empleadosRoutes);

export default router;