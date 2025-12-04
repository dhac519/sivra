import { Request, Response, NextFunction } from "express";
import { EmpleadosService } from "./empleados.service";

export class EmpleadosController {
  
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const empleados = await EmpleadosService.getAll();
      res.json(empleados);
    } catch (error) { next(error); }
  }

  static async getByDni(req: Request, res: Response, next: NextFunction) {
    try {
      const { dni } = req.params;
      const empleado = await EmpleadosService.getByDni(dni);
      res.json(empleado);
    } catch (error) { next(error); }
  }

  static async registrar(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await EmpleadosService.registrar(req.body);
      res.status(201).json(resultado);
    } catch (error) { next(error); }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const empleado = await EmpleadosService.update(id, req.body);
      res.json(empleado);
    } catch (error) { next(error); }
  }
}