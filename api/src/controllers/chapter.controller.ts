import * as chapterService from "../services/chapter.service";
import { Request, Response } from "express";
import toIntId from "../utils/toIntId";

export async function createChapter(req: Request, res: Response) {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newChapter = await chapterService.createChapter(title);
  res.status(201).json(newChapter);
}

export async function publishChapter(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  try {
    const updatedChapter = await chapterService.updateChapter(toIntId(id), {
      active: true,
    });
    if (!updatedChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    return res.status(200).json({
      message: "Chapter published successfully",
      chapter: updatedChapter,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to publish chapter" });
  }
}

export async function unpublishChapter(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  try {
    const updatedChapter = await chapterService.updateChapter(toIntId(id), {
      active: false,
    });
    if (!updatedChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    return res.status(200).json({
      message: "Chapter unpublished successfully",
      chapter: updatedChapter,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to unpublish chapter" });
  }
}

export async function getChapter(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  const chapter = await chapterService.getChapterById(toIntId(id));
  if (chapter) {
    return res.json(chapter);
  } else {
    return res.status(404).json({ error: "Chapter not found" });
  }
}

export async function getAllChapters(_req: Request, res: Response) {
  const chapters = await chapterService.getAllChapters();
  res.json(chapters);
}
export async function deleteChapter(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  try {
    await chapterService.deleteChapter(toIntId(id));
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete chapter" });
  }
}

export async function updateChapter(req: Request, res: Response) {
  const { id } = req.params;
  const { title, order, cost, active } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  try {
    const updatedChapter = await chapterService.updateChapter(toIntId(id), {
      title,
      order,
      cost,
      active,
    });
    return res.status(200).json(updatedChapter);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update chapter" });
  }
}
