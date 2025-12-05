import express from "express";
import cors from "cors";
import { env } from "./config/env";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API SIVRA funcionando ✅");
});

// Ruta de documentación (antes de las rutas de API)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

// middleware de errores SIEMPRE al final
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${env.port}`);
});
