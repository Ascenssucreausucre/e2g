import { Router } from "express";
import * as saveController from "../controllers/save.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();
router.post("/complete-chapter", requireAuth, saveController.completeChapter);
router.post(
  "/set-character-affinity",
  requireAuth,
  saveController.setCharacterAffinity
);

export default router;
