-- CreateEnum
CREATE TYPE "TipoPago" AS ENUM ('SUELDO', 'ADELANTO', 'BONO', 'LIQUIDACION', 'OTRO');

-- CreateTable
CREATE TABLE "PagoEmpleado" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto" DECIMAL(10,2) NOT NULL,
    "tipo" "TipoPago" NOT NULL,
    "descripcion" TEXT,
    "metodoPago" "MetodoPago" NOT NULL,
    "idEmpleado" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PagoEmpleado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PagoEmpleado" ADD CONSTRAINT "PagoEmpleado_idEmpleado_fkey" FOREIGN KEY ("idEmpleado") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagoEmpleado" ADD CONSTRAINT "PagoEmpleado_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
