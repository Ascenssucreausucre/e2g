// src/routes/chapter.routes.ts
import { Router } from "express";
import {
  createChapter,
  getAllChapters,
  getChapter,
  publishChapter,
  unpublishChapter,
  updateChapter,
} from "../controllers/chapter.controller";

const router = Router();
router.post("/create", createChapter);
router.post("/publish/:id", publishChapter);
router.post("/unpublish/:id", unpublishChapter);
router.get("/:id", getChapter);
router.get("/", getAllChapters);
router.patch("/:id", updateChapter);

export default router;
