import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { AuthRequest } from "../../middlewares/authMiddleware";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await AuthService.register(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "No autenticado" });
      }

      const usuario = await AuthService.me(req.user.id);
      return res.json(usuario);
    } catch (error) {
      next(error);
    }
  }
}
