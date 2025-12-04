import { Request, Response, NextFunction } from "express";
import { ProveedoresService } from "./proveedores.service";

export class ProveedoresController {
  
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const proveedores = await ProveedoresService.getAll();
      res.json(proveedores);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const proveedor = await ProveedoresService.create(req.body);
      res.status(201).json(proveedor);
    } catch (error) {
      next(error);
    }
  }
}