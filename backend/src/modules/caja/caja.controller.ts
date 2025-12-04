import { Request, Response, NextFunction } from "express";
import { CajaService } from "./caja.service";
import { AuthRequest } from "../../middlewares/authMiddleware";

export class CajaController {
  
  static async aperturar(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user?.id;
      if (!userId) return res.status(401).json({ message: "No autorizado" });
      
      const { montoInicial } = req.body;
      const resultado = await CajaService.aperturar(userId, montoInicial);
      res.status(201).json(resultado);
    } catch (error) { next(error); }
  }

  static async cerrar(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user?.id;
      if (!userId) return res.status(401).json({ message: "No autorizado" });

      const { montoFinal } = req.body;
      const resultado = await CajaService.cerrar(userId, montoFinal);
      res.json(resultado);
    } catch (error) { next(error); }
  }

  static async getHistorial(req: Request, res: Response, next: NextFunction) {
    try {
      const historial = await CajaService.getHistorial();
      res.json(historial);
    } catch (error) { next(error); }
  }
}