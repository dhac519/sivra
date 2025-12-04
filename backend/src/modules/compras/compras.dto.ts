export interface DetalleCompraDTO {
  idProducto: number;
  cantidad: number;
  precio: number; // Costo unitario de compra
}

export interface CreateCompraDTO {
  idProveedor: number;
  detalles: DetalleCompraDTO[];
}