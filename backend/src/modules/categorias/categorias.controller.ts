import { Request, Response, NextFunction } from "express";
import { CategoriasService } from "./categorias.service";

export class CategoriasController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categorias = await CategoriasService.getAll();
      res.json(categorias);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nombre } = req.body;
      const categoria = await CategoriasService.create(nombre);
      res.status(201).json(categoria);
    } catch (error) {
      next(error);
    }
  }
}