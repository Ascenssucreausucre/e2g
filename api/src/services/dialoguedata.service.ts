import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client";

export async function createDialogueData(
  chapterId: string,
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
