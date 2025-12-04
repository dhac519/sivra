import { Request, Response, NextFunction } from "express";
import { ProductosService } from "./productos.service";

export class ProductosController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const productos = await ProductosService.getAll();
      res.json(productos);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const producto = await ProductosService.getOne(id);
      res.json(producto);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const producto = await ProductosService.create(req.body);
      res.status(201).json(producto);
    } catch (error) {
      next(error);
    }
  }
}