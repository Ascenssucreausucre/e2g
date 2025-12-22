import { prisma } from "../prisma/client";

export async function createChapter(title: string) {
  return prisma.chapter.create({
    data: { title },
  });
}

export async function addRequirementsToChapter(
  chapterId: number,
  requiredChapters: number[],
  requiredAffinities: { characterId: number; affinity: number }[]
) {
  if (requiredChapters.length > 0) {
    await prisma.chapterRequirement.createMany({
      data: { chapterId, neededChapters: requiredChapters },
    });
  }
  if (requiredAffinities.length > 0) {
    const affinityRequirementsData = requiredAffinities.map((req) => ({
      chapterId,
      characterId: req.characterId,
      affinity: req.affinity,
    }));

    await prisma.affinityRequirement.createMany({
      data: affinityRequirementsData,
    });
  }
}

export async function removeRequirementsFromChapter(chapterId: number) {
  await prisma.chapterRequirement.deleteMany({
    where: { chapterId },
  });
  await prisma.affinityRequirement.deleteMany({
    where: { chapterId },
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

export async function getActiveChapters() {
  return prisma.chapter.findMany({
    where: { active: true },
    include: {
      dialogue: {
        select: { id: true, content: true },
      },
    },
  });
}

export async function deleteChapter(id: number) {
  return prisma.chapter.delete({
    where: { id },
  });
}

export async function updateChapter(
  id: number,
  updates: {
    title?: string;
    order?: string;
    cost?: number;
    active?: boolean;
    startCharacterIds?: number[];
  }
) {
  if (Object.keys(updates).length === 0) {
    throw new Error("No fields provided to update");
  }

  return prisma.chapter.update({
    where: { id },
    data: updates,
  });
}
