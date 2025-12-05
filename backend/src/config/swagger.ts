import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SIVRA - Documentación",
      version: "1.0.0",
      description: "Documentación de endpoints para el sistema de ventas SIVRA",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Servidor Local",
      },
      {
        url: "https://tu-app-en-render.onrender.com/api", // Lo cambiaremos luego
        description: "Servidor Producción",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Aquí indicamos dónde buscar los comentarios de documentación
  apis: ["./src/routes/*.ts", "./src/modules/**/*.ts"], 
};

export const swaggerSpec = swaggerJSDoc(options);