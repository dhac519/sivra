import { Request, Response, NextFunction } from "express";
import { ComprasService } from "./compras.service";
import { AuthRequest } from "../../middlewares/authMiddleware"; // Importar nuestra interfaz extendida

export class ComprasController {
  
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Casteamos req a AuthRequest para acceder a req.user
      const userId = (req as AuthRequest).user?.id; 
      
      if (!userId) {
        return res.status(401).json({ message: "Usuario no identificado" });
      }

      const compra = await ComprasService.create(userId, req.body);
      res.status(201).json(compra);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const compras = await ComprasService.getAll();
      res.json(compras);
    } catch (error) {
      next(error);
    }
  }
}