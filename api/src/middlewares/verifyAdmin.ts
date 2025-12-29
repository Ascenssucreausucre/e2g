import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/user.service";

export async function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const dbUser = await getUserById(user.userId);
  if (!dbUser || !dbUser.admin) {
    return res
      .status(403)
      .json({ error: "Access denied. Admin privileges required." });
  }
  next();
}
