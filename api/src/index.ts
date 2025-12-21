import "dotenv/config";
import express from "express";
import { prisma } from "./prisma/client";
import { registerRoutes } from "./routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());
registerRoutes(app);

app.get("/health", async (_req, res) => {
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
