// src/routes/chapter.routes.ts
import { Router } from "express";
import * as dialogueDataController from "../controllers/dialoguedata.controller";

const router = Router();
router.post("/create/:chapterId", dialogueDataController.createDialogueData);
router.get("/chapter/:id", dialogueDataController.getDialogueDataByChapterId);
router.put("/update/:id", dialogueDataController.updateDialogueData);
router.delete("/delete/:id", dialogueDataController.deleteDialogueData);

export default router;
