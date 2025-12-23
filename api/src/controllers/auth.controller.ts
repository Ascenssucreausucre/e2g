import { env } from "node:process";
import { authLogin } from "../services/auth.service";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const envVar = env.NODE_ENV !== "development";
  console.log(
    envVar ? "Running in production mode" : "Running in development mode"
  );
  try {
    const token = await authLogin(email, password);

    res.cookie("auth", token, {
      httpOnly: true,
      secure: env.NODE_ENV !== "development",
      sameSite: env.NODE_ENV === "development" ? "lax" : "none",
      path: "/",
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error: Error | any) {
    console.error("AuthController.login error:", error);
    return res
      .status(401)
      .json({ message: error?.message || "Internal server error" });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("auth");
  res.status(200).json({ message: "Logout successful" });
}
