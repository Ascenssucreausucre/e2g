// src/routes/chapter.routes.ts
import { Router } from "express";
import * as chapterController from "../controllers/chapter.controller";

const router = Router();
router.post("/create", chapterController.createChapter);
router.post("/publish/:id", chapterController.publishChapter);
router.post("/unpublish/:id", chapterController.unpublishChapter);
router.get("/:id", chapterController.getChapter);
router.get("/", chapterController.getAllChapters);
router.patch("/:id", chapterController.updateChapter);
router.patch(
  "/add-requirements/:id",
  chapterController.addRequirementsToChapter
);
router.patch(
  "/reset-requirements/:id",
  chapterController.resetChapterRequirements
);
router.delete("/:id", chapterController.deleteChapter);

export default router;
