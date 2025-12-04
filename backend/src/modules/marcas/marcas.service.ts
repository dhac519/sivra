import { prisma } from "../../config/prisma";

export class MarcasService {
  static async getAll() {
    return await prisma.marca.findMany({ orderBy: { nombre: 'asc' } });
  }

  static async create(nombre: string) {
    return await prisma.marca.create({ data: { nombre } });
  }
}