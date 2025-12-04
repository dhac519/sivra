import { MetodoPago, TipoPago } from "@prisma/client";

export interface CreatePagoDTO {
  idEmpleado: number;
  monto: number;
  tipo: TipoPago; // "SUELDO", "ADELANTO", etc.
  metodoPago: MetodoPago;
  descripcion?: string;
}