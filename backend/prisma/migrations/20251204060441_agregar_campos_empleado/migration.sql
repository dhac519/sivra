/*
  Warnings:

  - Added the required column `apellidos` to the `Empleado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Empleado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empleado" ADD COLUMN     "apellidos" TEXT NOT NULL,
ADD COLUMN     "emailPersonal" TEXT,
ADD COLUMN     "nombres" TEXT NOT NULL;
