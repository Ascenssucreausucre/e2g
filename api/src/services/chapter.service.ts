import { prisma } from "../prisma/client";

export async function createChapter(title: string) {
  return prisma.chapter.create({
    data: { title },
  });
}

export async function getChapterById(id: number) {
  return prisma.chapter.findUnique({
    where: { id },
    include: {
      dialogue: {
        select: { id: true, content: true },
      },
    },
  });
}

export async function getAllChapters() {
  return prisma.chapter.findMany();
}

export async function deleteChapter(id: number) {
  return prisma.chapter.delete({
    where: { id },
  });
}

export async function updateChapter(
  id: number,
  updates: { title?: string; order?: string; cost?: number; active?: boolean }
) {
  if (Object.keys(updates).length === 0) {
    throw new Error("No fields provided to update");
  }

  return prisma.chapter.update({
    where: { id },
    data: updates,
  });
}
