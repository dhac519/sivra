import { Request, Response, NextFunction } from "express";
import { UsuariosService } from "./usuarios.service";

export class UsuariosController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const usuarios = await UsuariosService.getAll();
      res.json(usuarios);
    } catch (error) { next(error); }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await UsuariosService.create(req.body);
      res.status(201).json(usuario);
    } catch (error) { next(error); }
  }
}