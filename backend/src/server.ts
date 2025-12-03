import express from "express";
import cors from "cors";
import { env } from "./config/env";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API SIVRA funcionando ✅");
});

app.use("/api", routes);

// middleware de errores SIEMPRE al final
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${env.port}`);
});
