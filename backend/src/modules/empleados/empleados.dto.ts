export interface RegistroEmpleadoDTO {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono?: string;
  direccion?: string;
  emailPersonal?: string; // Correo personal (Gmail, Hotmail)
  idRol: number;          // Rol que tendrá en el sistema (ej: 2 para Vendedor)
}

export interface UpdateEmpleadoDTO {
  telefono?: string;
  direccion?: string;
  emailPersonal?: string;
}