import { prisma } from "../../config/prisma";

export class ParametrosService {
  static async getAll() {
    return await prisma.parametro.findMany();
  }

  static async upsert(clave: string, valor: string) {
    return await prisma.parametro.upsert({
      where: { clave },
      update: { valor },
      create: { clave, valor }
    });
  }
}