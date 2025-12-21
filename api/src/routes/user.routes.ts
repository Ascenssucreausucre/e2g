// src/routes/user.routes.ts
import { Router } from "express";
import { getMe, getUser, register, getMyState } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();
router.post("/register", register);
router.get("/get/:email", getUser);
router.get("/me", requireAuth, getMe);
router.get("/me/state", requireAuth, getMyState);

export default router;
