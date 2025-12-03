import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthUserPayload {
  id: number;
  email: string;
  rol: string;
}

export interface AuthRequest extends Request {
  user?: AuthUserPayload;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthUserPayload;
    req.user = payload;
    next();
  } catch (_err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
