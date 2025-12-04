// backend/prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando sembrado de datos SIVRA...");

  // 1. Crear Roles según el Informe Técnico (Sección 3)
  const roles = [
    "SUPER_ADMIN",
    "ADMIN",
    "GERENTE_VENTAS",
    "CONTADOR",
    "CAJERA",
    "VENDEDOR",
    "ALMACENERO",
    "AUDITOR",
    "TECNICO_SISTEMAS",
    "CLIENTE_MAYORISTA"
  ];
  
  for (const nombre of roles) {
    await prisma.rol.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }
  console.log("✅ Roles del sistema creados correctamente.");

  // 2. Crear Usuario SUPER_ADMIN Inicial
  const emailSuper = "superadmin@sivra.com";
  const rolSuper = await prisma.rol.findUnique({ where: { nombre: "SUPER_ADMIN" } });

  if (rolSuper) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    
    await prisma.usuario.upsert({
      where: { email: emailSuper },
      update: {},
      create: {
        nombre: "Dante",
        apellido: "Arce", // Autor del documento
        email: emailSuper,
        passwordHash,
        idRol: rolSuper.id,
        estado: "ACTIVO"
      },
    });
    console.log(`✅ Usuario SUPER_ADMIN creado: ${emailSuper}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });