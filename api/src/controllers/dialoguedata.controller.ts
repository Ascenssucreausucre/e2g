import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import * as dialogueDataService from "../services/dialoguedata.service";
import toIntId from "../utils/toIntId";

export async function createDialogueData(req: Request, res: Response) {
  const { chapterId } = req.params;
  const { content } = req.body;

  if (!chapterId || !content) {
    return res.status(400).json({
      error: `Missing arguments : ${!chapterId ? "chapterId " : ""}${
        !content ? "content" : ""
      }`,
    });
  }
  try {
    const dialogueData = await dialogueDataService.createDialogueData(
      toIntId(chapterId),
      content as Prisma.JsonObject
    );
    return res.status(201).json(dialogueData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create dialogue data" });
  }
}

export async function getDialogueDataByChapterId(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Dialogue Data ID is required" });
  }
  const dialogueData = await dialogueDataService.getDialogueDataByChapterId(id);
  if (dialogueData) {
    return res.json(dialogueData);
  } else {
    return res.status(404).json({ error: "Dialogue Data not found" });
  }
}

export async function updateDialogueData(req: Request, res: Response) {
  const { id } = req.params;
  const { content } = req.body;

  if (!id || !content) {
    return res
      .status(400)
      .json({ error: "Dialogue Data ID and content are required" });
  }

  try {
    const dialogueData = await dialogueDataService.updateDialogueData(id, {
      content: content as Prisma.JsonObject,
    });
    return res.json(dialogueData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update dialogue data" });
  }
}

export async function deleteDialogueData(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Dialogue Data ID is required" });
  }
  try {
    await dialogueDataService.deleteDialogueData(id);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete dialogue data" });
  }
}
