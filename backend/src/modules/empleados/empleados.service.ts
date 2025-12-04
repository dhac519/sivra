import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { HttpError } from "../../core/httpError";
import { RegistroEmpleadoDTO, UpdateEmpleadoDTO } from "./empleados.dto";

export class EmpleadosService {
  
  // Listar todos los empleados con sus datos de usuario
  static async getAll() {
    return await prisma.empleado.findMany({
      include: {
        usuario: {
          select: {
            email: true, // Correo corporativo
            rol: true,
            estado: true
          }
        }
      },
      orderBy: { apellidos: 'asc' }
    });
  }

  // Buscar por DNI
  static async getByDni(dni: string) {
    const empleado = await prisma.empleado.findUnique({
      where: { dni },
      include: {
        usuario: { select: { email: true, rol: true, estado: true } }
      }
    });

    if (!empleado) throw new HttpError(404, "Empleado no encontrado");
    return empleado;
  }

  // Actualizar datos de contacto
  static async update(id: number, data: UpdateEmpleadoDTO) {
    return await prisma.empleado.update({
      where: { id },
      data: {
        telefono: data.telefono,
        direccion: data.direccion,
        emailPersonal: data.emailPersonal
      }
    });
  }

  // 🔥 REGISTRO INTELIGENTE (Genera Usuario Automáticamente)
  static async registrar(data: RegistroEmpleadoDTO) {
    
    // 1. Validar que el DNI no exista
    const existeDni = await prisma.empleado.findUnique({ where: { dni: data.dni } });
    if (existeDni) throw new HttpError(400, "El DNI ya está registrado en el sistema.");

    // 2. Generar Email Corporativo Único
    // Fórmula: Iniciales de Nombres + Iniciales de Apellidos + DNI + @sivra.com
    
    const partesNombres = data.nombres.trim().split(/\s+/);   // Ej: ["Dante", "Hans"]
    const partesApellidos = data.apellidos.trim().split(/\s+/); // Ej: ["Arce", "Cotrina"]

    const iniN1 = partesNombres[0] ? partesNombres[0].charAt(0) : "";
    const iniN2 = partesNombres.length > 1 ? partesNombres[1].charAt(0) : "";
    
    const iniA1 = partesApellidos[0] ? partesApellidos[0].charAt(0) : "";
    const iniA2 = partesApellidos.length > 1 ? partesApellidos[1].charAt(0) : "";

    // Ejemplo resultado: dhac12345678@sivra.com
    const emailCorporativo = `${iniN1}${iniN2}${iniA1}${iniA2}${data.dni}@sivra.com`.toLowerCase();

    // 3. Generar Contraseña Inicial (El mismo DNI)
    const passwordHash = await bcrypt.hash(data.dni, 10);
    
    // 4. Nombre Corto para el Usuario (Ej: "Dante Arce")
    const nombreMostrar = `${partesNombres[0]} ${partesApellidos[0]}`;

    // 5. Transacción: Crear Usuario + Crear Empleado
    return await prisma.$transaction(async (tx) => {
      
      // A. Crear la Cuenta de Usuario
      const nuevoUsuario = await tx.usuario.create({
        data: {
          email: emailCorporativo,
          passwordHash: passwordHash,
          nombre: partesNombres[0],   // Guardamos primer nombre en Usuario
          apellido: partesApellidos[0], // Guardamos primer apellido en Usuario
          idRol: data.idRol,
          estado: "ACTIVO"
        }
      });

      // B. Crear la Ficha de Empleado
      const nuevoEmpleado = await tx.empleado.create({
        data: {
          nombres: data.nombres,
          apellidos: data.apellidos,
          dni: data.dni,
          telefono: data.telefono,
          direccion: data.direccion,
          emailPersonal: data.emailPersonal,
          idUsuario: nuevoUsuario.id
        }
      });

      return {
        empleado: nuevoEmpleado,
        credenciales: {
          usuario: emailCorporativo,
          passwordInicial: data.dni,
          mensaje: "El usuario ha sido generado automáticamente."
        }
      };
    });
  }
}