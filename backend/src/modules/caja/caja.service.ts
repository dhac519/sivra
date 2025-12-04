import { prisma } from "../../config/prisma";
import { HttpError } from "../../core/httpError";
import { EstadoCaja } from "@prisma/client";

export class CajaService {
  
  // Verificar si ya hay una caja abierta hoy
  static async verificarCajaAbierta() {
    return await prisma.caja.findFirst({
      where: { estado: EstadoCaja.ABIERTA }
    });
  }

  static async aperturar(userId: number, montoInicial: number) {
    const cajaAbierta = await this.verificarCajaAbierta();
    if (cajaAbierta) throw new HttpError(400, "Ya existe una caja abierta.");

    return await prisma.$transaction(async (tx) => {
      // 1. Crear la Caja física (o usar una lógica, aquí creamos una sesión de caja nueva)
      const nuevaCaja = await tx.caja.create({
        data: {
          estado: EstadoCaja.ABIERTA,
          montoInicial: montoInicial,
          fecha: new Date()
        }
      });

      // 2. Registrar el evento de apertura (Quién la abrió)
      await tx.cierreCaja.create({
        data: {
          idCaja: nuevaCaja.id,
          idUsuarioApertura: userId,
          montoApertura: montoInicial,
          fechaApertura: new Date()
        }
      });

      return nuevaCaja;
    });
  }

  static async cerrar(userId: number, montoCierre: number) {
    const caja = await this.verificarCajaAbierta();
    if (!caja) throw new HttpError(400, "No hay ninguna caja abierta para cerrar.");

    return await prisma.$transaction(async (tx) => {
      // 1. Cerrar la Caja principal
      const cajaCerrada = await tx.caja.update({
        where: { id: caja.id },
        data: {
          estado: EstadoCaja.CERRADA,
          montoFinal: montoCierre
        }
      });

      // 2. Buscar el registro de apertura para actualizarlo con el cierre
      // (Asumimos que solo hay un CierreCaja activo por Caja, o buscamos el último)
      const cierreRegistro = await tx.cierreCaja.findFirst({
        where: { idCaja: caja.id, fechaCierre: null }
      });

      if (cierreRegistro) {
        await tx.cierreCaja.update({
          where: { id: cierreRegistro.id },
          data: {
            fechaCierre: new Date(),
            montoCierre: montoCierre,
            idUsuarioCierre: userId
          }
        });
      }

      return cajaCerrada;
    });
  }

  static async getHistorial() {
    return await prisma.caja.findMany({
      orderBy: { fecha: 'desc' },
      include: { cierres: { include: { usuarioApertura: true, usuarioCierre: true } } }
    });
  }
}