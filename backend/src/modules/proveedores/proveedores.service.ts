import { prisma } from "../../config/prisma";
import { HttpError } from "../../core/httpError";

export class ProveedoresService {
  
  static async getAll() {
    return await prisma.proveedor.findMany({
      orderBy: { razonSocial: 'asc' }
    });
  }

  static async create(data: { ruc: string; razonSocial: string; email?: string; telefono?: string; direccion?: string }) {
    // Validar RUC duplicado
    const existe = await prisma.proveedor.findUnique({
      where: { ruc: data.ruc }
    });
    
    if (existe) {
      throw new HttpError(400, "Ya existe un proveedor con ese RUC");
    }

    return await prisma.proveedor.create({
      data: {
        ruc: data.ruc,
        razonSocial: data.razonSocial,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion
      }
    });
  }
}