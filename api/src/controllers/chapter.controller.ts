import * as chapterService from "../services/chapter.service";
import { Request, Response } from "express";
import toIntId from "../utils/toIntId";

export async function createChapter(req: Request, res: Response) {
  const { title, requiredChapters, requiredAffinities } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newChapter = await chapterService.createChapter(title);
  if (requiredChapters || requiredAffinities) {
    await chapterService.addRequirementsToChapter(
      newChapter.id,
      requiredChapters || [],
      requiredAffinities || []
    );
  }
  res.status(201).json(newChapter);
}

export async function resetChapterRequirements(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  try {
    await chapterService.removeRequirementsFromChapter(toIntId(id));
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to delete chapter requirements" });
  }
}

export async function addRequirementsToChapter(req: Request, res: Response) {
  const { id } = req.params;
  const { requiredChapters, requiredAffinities } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  if (!requiredChapters && !requiredAffinities) {
    return res
      .status(400)
      .json({
        error:
          "At least one of requiredChapters or requiredAffinities must be provided",
      });
  }
  if (requiredChapters && !Array.isArray(requiredChapters)) {
    return res.status(400).json({ error: "requiredChapters must be an array" });
  }
  if (requiredAffinities && !Array.isArray(requiredAffinities)) {
    return res
      .status(400)
      .json({ error: "requiredAffinities must be an array" });
  }
  try {
    await chapterService.addRequirementsToChapter(
      toIntId(id),
      requiredChapters || [],
      requiredAffinities || []
    );
    return res.status(204).json({ message: "Requirements added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add requirements to chapter" });
  }
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
  const { title, order, cost, active, startCharacterIds } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Chapter ID is required" });
  }
  try {
    const updatedChapter = await chapterService.updateChapter(toIntId(id), {
      title,
      order,
      cost,
      active,
      startCharacterIds,
    });
    return res.status(200).json(updatedChapter);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update chapter" });
  }
}
