import { prisma } from "../../config/prisma";
import { CreateVentaDTO } from "./ventas.dto";
import { TipoMovimiento, EstadoVenta } from "@prisma/client";
import { HttpError } from "../../core/httpError";

export class VentasService {
  
  static async create(userId: number, data: CreateVentaDTO) {
    // Calcular total
    const total = data.detalles.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

    return await prisma.$transaction(async (tx) => {
      
      // 1. Validar Stock de TODOS los productos antes de vender
      for (const item of data.detalles) {
        const producto = await tx.producto.findUnique({ where: { id: item.idProducto } });
        if (!producto) throw new HttpError(404, `Producto ${item.idProducto} no encontrado`);
        
        if (producto.stock < item.cantidad) {
          throw new HttpError(400, `Stock insuficiente para el producto: ${producto.nombre}. Disponible: ${producto.stock}`);
        }
      }

      // 2. Crear la Venta
      const venta = await tx.venta.create({
        data: {
          idCliente: data.idCliente,
          idUsuario: userId,
          total: total,
          metodoPago: data.metodoPago,
          comprobante: data.comprobante,
          estado: EstadoVenta.PAGADA, // Asumimos venta directa en mostrador
          detalles: {
            create: data.detalles.map(d => ({
              idProducto: d.idProducto,
              cantidad: d.cantidad,
              precio: d.precio
            }))
          }
        },
        include: { detalles: true }
      });

      // 3. Descontar Stock y Registrar Kardex
      for (const item of data.detalles) {
        await tx.producto.update({
          where: { id: item.idProducto },
          data: { stock: { decrement: item.cantidad } }
        });

        await tx.movimientoInventario.create({
          data: {
            tipo: TipoMovimiento.SALIDA,
            cantidad: item.cantidad,
            idProducto: item.idProducto,
            idVenta: venta.id,
            idUsuario: userId,
            descripcion: "Salida por Venta #" + venta.id
          }
        });
      }

      return venta;
    });
  }

  static async getAll() {
    return await prisma.venta.findMany({
      include: {
        cliente: true,
        usuario: true,
        detalles: { include: { producto: true } }
      },
      orderBy: { fecha: 'desc' }
    });
  }
}