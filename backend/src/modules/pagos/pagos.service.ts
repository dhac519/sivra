import { prisma } from "../../config/prisma";
import { CreatePagoDTO } from "./pagos.dto";
import { HttpError } from "../../core/httpError";

export class PagosService {
  
  static async create(adminId: number, data: CreatePagoDTO) {
    // Validar que el empleado exista
    const empleado = await prisma.empleado.findUnique({ where: { id: data.idEmpleado } });
    if (!empleado) throw new HttpError(404, "Empleado no encontrado");

    return await prisma.pagoEmpleado.create({
      data: {
        idEmpleado: data.idEmpleado,
        idUsuario: adminId, // Quién registra el pago
        monto: data.monto,
        tipo: data.tipo,
        metodoPago: data.metodoPago,
        descripcion: data.descripcion
      }
    });
  }

  static async getAll() {
    return await prisma.pagoEmpleado.findMany({
      include: {
        empleado: {
          select: { nombres: true, apellidos: true, dni: true }
        },
        usuario: {
          select: { nombre: true, apellido: true } // Quién pagó
        }
      },
      orderBy: { fecha: 'desc' }
    });
  }

  // Ver historial de pagos de un empleado específico
  static async getByEmpleado(idEmpleado: number) {
    return await prisma.pagoEmpleado.findMany({
      where: { idEmpleado },
      include: { usuario: { select: { nombre: true } } },
      orderBy: { fecha: 'desc' }
    });
  }
}