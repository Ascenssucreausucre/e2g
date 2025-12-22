import { Request, Response } from "express";
import * as saveService from "../services/save.service";

export async function completeChapter(req: Request, res: Response) {
  const { chapterId } = req.body;
  const user = req.user;
  const userId = user?.userId;
  if (!userId || !chapterId) {
    return res.status(400).json({ error: "Missing userId or chapterId" });
  }
  try {
    await saveService.addCompletedChapter(userId, chapterId);
    res.status(200).json({ message: "Chapter completed successfully." });
  } catch (error) {
    console.error("Error completing chapter:", error);
    res.status(500).json({ error: "Failed to complete chapter." });
  }
}

export async function setCharacterAffinity(req: Request, res: Response) {
  const { characterId, value } = req.body;
  const user = req.user;
  const userId = user?.userId;
  if (!userId || !characterId || value === undefined) {
    return res
      .status(400)
      .json({ error: "Missing userId, characterId, or value" });
  }
  try {
    await saveService.updateCharacterAffinity(userId, characterId, value);
    res
      .status(200)
      .json({ message: "Character affinity updated successfully." });
  } catch (error) {
    console.error("Error updating character affinity:", error);
    res.status(500).json({ error: "Failed to update character affinity." });
  }
}
