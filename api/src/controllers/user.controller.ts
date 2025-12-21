// src/controllers/user.controller.ts
import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const user = await userService.createUser(email, password);
  res.status(201).json(user);
}

export async function getUser(req: Request, res: Response) {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Email parameter is required" });
  }
  const user = await userService.getUserByEmail(email);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
}

export async function getMe(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userData = await userService.getUserById(user.userId);
  if (userData) {
    return res.json(userData);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
}

export async function getMyState(req: Request, res: Response) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  try {
    const state = await userService.getOrCreatePlayerState(user.userId);
    return res.json(state);
  } catch (error) {
    console.error("controllers.user.getMyState error:", error);
    return res.status(500).json({ message: "Could not get or create player state" });
  }
}
