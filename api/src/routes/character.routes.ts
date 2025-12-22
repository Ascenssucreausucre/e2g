// src/routes/chapter.routes.ts
import { Router } from "express";
import * as characterController from "../controllers/character.controller";

const router = Router();
router.post("/create", characterController.createCharacter);
router.get("/:id", characterController.getCharacter);
router.get("/", characterController.getAllCharacters);
router.patch("/update/:id", characterController.updateCharacter);
router.delete("/delete/:id", characterController.deleteCharacter);

export default router;
