import { Request, Response, NextFunction } from "express";
import { ParametrosService } from "./parametros.service";

export class ParametrosController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const params = await ParametrosService.getAll();
      res.json(params);
    } catch (error) { next(error); }
  }

  static async save(req: Request, res: Response, next: NextFunction) {
    try {
      const { clave, valor } = req.body;
      const param = await ParametrosService.upsert(clave, valor);
      res.json(param);
    } catch (error) { next(error); }
  }
}