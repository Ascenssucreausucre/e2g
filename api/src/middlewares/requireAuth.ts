import { verifyJwt } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  console.log("Authenticating request...");
  const token = req.cookies.auth;
  console.log("Token found:", !!token);
  if (!token) return res.sendStatus(401);

  const user = verifyJwt<{ userId: string }>(token);
  console.log("Token valid:", !!user);
  if (!user) return res.sendStatus(401);

  req.user = user;
  console.log("Authentication successful for user:", user.userId);
  next();
}
