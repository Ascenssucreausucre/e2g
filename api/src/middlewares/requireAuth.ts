import { verifyJwt } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth;
  if (!token) return res.sendStatus(401);

  const user = verifyJwt<{ userId: string }>(token);
  if (!user) return res.sendStatus(401);

  req.user = user;
  next();
}
