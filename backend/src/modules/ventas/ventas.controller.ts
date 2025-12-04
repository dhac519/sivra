import { Request, Response, NextFunction } from "express";
import { VentasService } from "./ventas.service";
import { AuthRequest } from "../../middlewares/authMiddleware";

export class VentasController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user?.id;
      if (!userId) return res.status(401).json({ message: "Usuario no identificado" });

      const venta = await VentasService.create(userId, req.body);
      res.status(201).json(venta);
    } catch (error) { next(error); }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const ventas = await VentasService.getAll();
      res.json(ventas);
    } catch (error) { next(error); }
  }
}