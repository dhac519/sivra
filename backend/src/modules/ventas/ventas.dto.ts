import { MetodoPago, TipoComprobante } from "@prisma/client";

export interface DetalleVentaDTO {
  idProducto: number;
  cantidad: number;
  precio: number; // Precio de venta unitario
}

export interface CreateVentaDTO {
  idCliente: number;
  metodoPago: MetodoPago;
  comprobante: TipoComprobante;
  detalles: DetalleVentaDTO[];
}