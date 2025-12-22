// src/services/user.service.ts
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });
}

export async function getOrCreatePlayerState(userId: string) {
  try {
    return prisma.playerState.upsert({
      where: { userId },
      create: {
        userId,
      },
      update: {},
      include: {
        completedChapters: { select: { id: true, title: true } },
        affinities: { select: { characterId: true, value: true } },
      },
    });
  } catch (error: Error | any) {
    console.error("Error in getOrCreatePlayerState:", error.message);
    throw error;
  }
}

export async function getUnlockedChapters(userId: string) {
  const ps = await prisma.playerState.findUnique({
    where: { userId },
    include: {
      completedChapters: { select: { id: true } },
      affinities: true,
    },
  });
  if (!ps) throw new Error("PlayerState not found");

  const completedIds = ps.completedChapters.map((c) => c.id);

  const completedArray = completedIds.length
    ? Prisma.sql`ARRAY[${Prisma.join(
        completedIds.map((id) => Prisma.sql`${id}`)
      )}]::int[]`
    : Prisma.sql`ARRAY[]::int[]`;

  const playerStateId = ps.id;

  const rows = await prisma.$queryRaw(
    Prisma.sql`
      SELECT DISTINCT c.*
      FROM "Chapter" c
      LEFT JOIN "ChapterRequirement" cr ON cr."chapterId" = c.id
      LEFT JOIN "AffinityRequirement" ar ON ar."chapterId" = c.id
      LEFT JOIN "Affinity" a ON a."playerStateId" = ${playerStateId} AND a."characterId" = ar."characterId"
      WHERE c."active" = true
        AND (
          cr.id IS NULL
          OR cr."neededChapters" IS NULL
          OR cr."neededChapters" <@ ${completedArray}
        )
        AND (
          ar.id IS NULL
          OR ar."affinity" IS NULL
          OR COALESCE(a.value, 0) >= ar."affinity"
        )
    `
  );

  return rows;
}
