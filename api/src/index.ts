import "dotenv/config";
import express from "express";
import { prisma } from "./prisma/client";
import { registerRoutes } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response } from "express";

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

registerRoutes(app);

app.get("/health", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.count();
    res.json({
      status: "ok",
      users,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      details: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
