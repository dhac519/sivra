import { prisma } from "../../config/prisma";

export class KardexService {
  
  static async getAll() {
    return await prisma.movimientoInventario.findMany({
      include: {
        producto: {
          select: { codigo: true, nombre: true } // Solo traemos datos necesarios
        },
        usuario: {
          select: { nombre: true, apellido: true }
        },
        compra: { // Si fue entrada por compra, traemos el proveedor
           include: { proveedor: true } 
        },
        venta: { // Si fue salida por venta, traemos el cliente
           include: { cliente: true }
        }
      },
      orderBy: { fecha: 'desc' } // Lo más reciente primero
    });
  }

  // Opcional: Filtrar por producto específico
  static async getByProduct(productoId: number) {
    return await prisma.movimientoInventario.findMany({
      where: { idProducto: productoId },
      include: {
        usuario: { select: { nombre: true, apellido: true } }
      },
      orderBy: { fecha: 'desc' }
    });
  }
}