import { prisma } from "../../config/prisma";
import { HttpError } from "../../core/httpError";
import { CreateProductoDTO } from "./productos.dto";

export class ProductosService {
  static async getAll() {
    return await prisma.producto.findMany({
      include: {
        categoria: true,
        marca: true,
      },
      orderBy: { nombre: 'asc' }
    });
  }

  static async getOne(id: number) {
    const producto = await prisma.producto.findUnique({
      where: { id },
      include: { categoria: true, marca: true }
    });
    if (!producto) throw new HttpError(404, "Producto no encontrado");
    return producto;
  }

  static async create(data: CreateProductoDTO) {
    // 1. Validar que el código no exista
    const existeCodigo = await prisma.producto.findUnique({
      where: { codigo: data.codigo }
    });
    if (existeCodigo) throw new HttpError(400, "El código del producto ya existe");

    // 2. Crear producto
    return await prisma.producto.create({
      data: {
        codigo: data.codigo,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock || 0,
        idCategoria: data.idCategoria,
        idMarca: data.idMarca
      }
    });
  }
}