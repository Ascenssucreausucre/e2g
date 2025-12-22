// src/routes/user.routes.ts
import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();
router.post("/register", userController.register);
router.get("/get/:email", userController.getUser);
router.get("/me", requireAuth, userController.getMe);
router.get("/me/state", requireAuth, userController.getMyState);
router.get(
  "/me/unlocked-chapters",
  requireAuth,
  userController.getUnlockedChapters
);

export default router;
