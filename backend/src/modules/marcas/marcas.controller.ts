import { Request, Response, NextFunction } from "express";
import { MarcasService } from "./marcas.service";

export class MarcasController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const marcas = await MarcasService.getAll();
      res.json(marcas);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nombre } = req.body;
      const marca = await MarcasService.create(nombre);
      res.status(201).json(marca);
    } catch (error) {
      next(error);
    }
  }
}