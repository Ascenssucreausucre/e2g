// src/routes/index.ts
import { Express } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import chapterRoutes from "./chapter.routes";

export function registerRoutes(app: Express) {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/chapters", chapterRoutes);
}
