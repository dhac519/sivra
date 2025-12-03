export interface RegisterDTO {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rolNombre: string; // "ADMIN" | "VENDEDOR" | etc.
}

export interface LoginDTO {
  email: string;
  password: string;
}
