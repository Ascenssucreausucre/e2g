import { JsonObject } from "../generated/prisma/internal/prismaNamespaceBrowser";
import { prisma } from "../prisma/client";

export async function createDialogueData(
  chapterId: number,
  content: JsonObject
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
  updates: { content: JsonObject }
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
