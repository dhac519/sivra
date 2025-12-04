import { Request, Response, NextFunction } from "express";
import { PagosService } from "./pagos.service";
import { AuthRequest } from "../../middlewares/authMiddleware";

export class PagosController {
  
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = (req as AuthRequest).user?.id;
      if (!adminId) return res.status(401).json({ message: "No autorizado" });

      const pago = await PagosService.create(adminId, req.body);
      res.status(201).json(pago);
    } catch (error) { next(error); }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagos = await PagosService.getAll();
      res.json(pagos);
    } catch (error) { next(error); }
  }

  static async getByEmpleado(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.idEmpleado);
      const pagos = await PagosService.getByEmpleado(id);
      res.json(pagos);
    } catch (error) { next(error); }
  }
}