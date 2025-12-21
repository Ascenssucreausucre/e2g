import { authLogin } from "../services/auth.service";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const token = await authLogin(email, password);

  res.cookie("auth", token, { httpOnly: true });
  res.sendStatus(204);
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("auth");
  res.sendStatus(204);
}
