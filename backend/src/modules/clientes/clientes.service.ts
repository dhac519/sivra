import { prisma } from "../../config/prisma";
import { HttpError } from "../../core/httpError";
import { TipoCliente } from "@prisma/client";

export class ClientesService {
  static async getAll() {
    return await prisma.cliente.findMany({ orderBy: { nombre: 'asc' } });
  }

  static async create(data: { nombre: string; tipo: TipoCliente; documento?: string; telefono?: string; email?: string; direccion?: string }) {
    if (data.documento) {
      const existe = await prisma.cliente.findUnique({ where: { documento: data.documento } });
      if (existe) throw new HttpError(400, "El cliente con ese documento ya existe");
    }
    return await prisma.cliente.create({ data });
  }
}