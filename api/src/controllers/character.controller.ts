import { Request, Response } from "express";
import * as characterService from "../services/character.service";
import toIntId from "../utils/toIntId";

export async function createCharacter(req: Request, res: Response) {
  const { name, description, portrait } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newCharacter = await characterService.createCharacter({
    name,
    description,
    portrait,
  });
  return res.status(201).json(newCharacter);
}

export async function getCharacter(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Character ID is required" });
  }
  const character = await characterService.getCharacterById(toIntId(id));
  if (character) {
    return res.json(character);
  } else {
    return res.status(404).json({ error: "Character not found" });
  }
}

export async function getAllCharacters(_req: Request, res: Response) {
  const characters = await characterService.getAllCharacters();
  return res.json(characters);
}

export async function updateCharacter(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description, portrait } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Character ID is required" });
  }
  try {
    const updatedCharacter = await characterService.updateCharacter(
      toIntId(id),
      {
        name,
        description,
        portrait,
      }
    );
    if (updatedCharacter) {
      return res.json(updatedCharacter);
    } else {
      return res.status(404).json({ error: "Character not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update character" });
  }
}
export async function deleteCharacter(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Character ID is required" });
  }
  try {
    await characterService.deleteCharacter(toIntId(id));
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete character" });
  }
}
