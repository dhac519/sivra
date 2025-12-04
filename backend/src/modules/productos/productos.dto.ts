export interface CreateProductoDTO {
  codigo: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number;
  idCategoria: number;
  idMarca: number;
}