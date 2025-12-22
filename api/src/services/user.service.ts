// src/services/user.service.ts
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
    });
  } catch (error: Error | any) {
    console.error("Error in getOrCreatePlayerState:", error.message);
    throw error;
  }
}
