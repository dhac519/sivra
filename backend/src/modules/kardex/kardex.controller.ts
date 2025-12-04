import { Request, Response, NextFunction } from "express";
import { KardexService } from "./kardex.service";

export class KardexController {
  
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const movimientos = await KardexService.getAll();
      res.json(movimientos);
    } catch (error) {
      next(error);
    }
  }

  static async getByProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.idProducto);
      const movimientos = await KardexService.getByProduct(id);
      res.json(movimientos);
    } catch (error) {
      next(error);
    }
  }
}