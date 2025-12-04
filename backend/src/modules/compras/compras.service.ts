import { prisma } from "../../config/prisma";
import { CreateCompraDTO } from "./compras.dto";
import { TipoMovimiento, EstadoCompra } from "@prisma/client";

export class ComprasService {
  
  // Necesitamos el userId para saber QUIÉN registró la compra
  static async create(userId: number, data: CreateCompraDTO) {
    
    // 1. Calcular el total de la compra (suma de cantidad * precio)
    const total = data.detalles.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

    // 2. Iniciar la TRANSACCIÓN (Todo o nada)
    return await prisma.$transaction(async (tx) => {
      
      // A. Crear la cabecera de la Compra
      const compra = await tx.compra.create({
        data: {
          idProveedor: data.idProveedor,
          idUsuario: userId,
          total: total,
          estado: EstadoCompra.PAGADA, // Asumimos que la mercadería ingresa pagada
          detalles: {
            create: data.detalles.map(d => ({
              idProducto: d.idProducto,
              cantidad: d.cantidad,
              precio: d.precio
            }))
          }
        },
        include: { detalles: true } // Opcional para devolver los detalles
      });

      // B. Actualizar Stock y Kardex por cada producto
      for (const item of data.detalles) {
        
        // B1. Aumentar Stock del Producto
        await tx.producto.update({
          where: { id: item.idProducto },
          data: { stock: { increment: item.cantidad } }
        });

        // B2. Registrar en Kardex (Movimiento de Inventario)
        await tx.movimientoInventario.create({
          data: {
            tipo: TipoMovimiento.ENTRADA,
            cantidad: item.cantidad,
            idProducto: item.idProducto,
            idCompra: compra.id,
            idUsuario: userId,
            descripcion: "Ingreso por Compra #" + compra.id
          }
        });
      }

      return compra;
    });
  }

  static async getAll() {
    return await prisma.compra.findMany({
      include: {
        proveedor: true,
        usuario: true,
        detalles: {
          include: { producto: true }
        }
      },
      orderBy: { fecha: 'desc' }
    });
  }
}