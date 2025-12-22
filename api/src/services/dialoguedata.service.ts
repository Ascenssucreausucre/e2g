import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client";

export async function createDialogueData(
  chapterId: number,
  content: Prisma.JsonObject
) {
  return prisma.dialogueData.create({
    data: {
      chapterId,
      content,
    },
  });
}

export async function getDialogueDataByChapterId(id: string) {
  return prisma.dialogueData.findUnique({
    where: { id },
  });
}

export async function getDialogueDataById(id: string) {
  return prisma.dialogueData.findUnique({
    where: { id },
  });
}

export async function updateDialogueData(
  id: string,
  updates: { content: Prisma.JsonObject }
) {
  return prisma.dialogueData.update({
    where: { id },
    data: updates,
  });
}

export async function deleteDialogueData(id: string) {
  return prisma.dialogueData.delete({
    where: { id },
  });
}
