import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { HttpError } from "../../core/httpError";

export class UsuariosService {
  
  static async getAll() {
    return await prisma.usuario.findMany({
      include: { rol: true, empleado: true }
    });
  }

  static async create(data: any) {
    // Verificar email
    const existe = await prisma.usuario.findUnique({ where: { email: data.email } });
    if (existe) throw new HttpError(400, "El email ya está registrado");

    const rol = await prisma.rol.findUnique({ where: { nombre: data.rolNombre } });
    if (!rol) throw new HttpError(400, "Rol no válido");

    const hash = await bcrypt.hash(data.password, 10);

    // Crear Usuario y Empleado en una transacción
    return await prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.create({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          passwordHash: hash,
          idRol: rol.id
        }
      });

      // Si vienen datos de empleado, lo creamos
      if (data.dni) {
        await tx.empleado.create({
          data: {
            dni: data.dni,
            telefono: data.telefono,
            direccion: data.direccion,
            idUsuario: usuario.id
          }
        });
      }
      return usuario;
    });
  }
}