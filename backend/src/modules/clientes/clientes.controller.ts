import { Request, Response, NextFunction } from "express";
import { ClientesService } from "./clientes.service";

export class ClientesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clientes = await ClientesService.getAll();
      res.json(clientes);
    } catch (error) { next(error); }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const cliente = await ClientesService.create(req.body);
      res.status(201).json(cliente);
    } catch (error) { next(error); }
  }
}