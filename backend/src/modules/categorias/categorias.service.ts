import { prisma } from "../../config/prisma";

export class CategoriasService {
  static async getAll() {
    return await prisma.categoria.findMany({
      orderBy: { nombre: 'asc' }
    });
  }

  static async create(nombre: string) {
    return await prisma.categoria.create({
      data: { nombre }
    });
  }
}