import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { env } from "../../config/env";
import { HttpError } from "../../core/httpError";
import { LoginDTO, RegisterDTO } from "./auth.dto";

export class AuthService {
  static async register(data: RegisterDTO) {
    const nombre = data.nombre.trim();
    const apellido = data.apellido.trim();
    const email = data.email.trim().toLowerCase();
    const password = data.password;
    const rolNombre = data.rolNombre.trim().toUpperCase();

    if (!nombre || !apellido || !email || !password || !rolNombre) {
      throw new HttpError(400, "Todos los campos son obligatorios");
    }

    const existing = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existing) {
      throw new HttpError(400, "El email ya está registrado");
    }

    // Buscar rol, si no existe lo creamos
    let rol = await prisma.rol.findUnique({
      where: { nombre: rolNombre },
    });

    if (!rol) {
      rol = await prisma.rol.create({
        data: {
          nombre: rolNombre,
        },
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        passwordHash: hash,
        idRol: rol.id,
      },
      include: {
        rol: true,
      },
    });

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol.nombre,
      createdAt: usuario.createdAt,
    };
  }

  static async login(data: LoginDTO) {
    const email = data.email.trim().toLowerCase();
    const password = data.password;

    if (!email || !password) {
      throw new HttpError(400, "Email y contraseña son obligatorios");
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: { rol: true },
    });

    if (!usuario) {
      throw new HttpError(401, "Credenciales inválidas");
    }

    const isValid = await bcrypt.compare(password, usuario.passwordHash);
    if (!isValid) {
      throw new HttpError(401, "Credenciales inválidas");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
      env.jwtSecret, // siempre string
      {
        expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
      }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
    };
  }

  static async me(userId: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { rol: true },
    });

    if (!usuario) {
      throw new HttpError(404, "Usuario no encontrado");
    }

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol.nombre,
      createdAt: usuario.createdAt,
    };
  }
}
