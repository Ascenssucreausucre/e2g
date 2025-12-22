import { prisma } from "../prisma/client";

export async function addCompletedChapter(userId: string, chapterId: number) {
  return prisma.playerState.update({
    where: { userId },
    data: {
      completedChapters: {
        connect: { id: chapterId },
      },
    },
  });
}

export async function updateCharacterAffinity(
  userId: string,
  characterId: number,
  value: number
) {
  const playerState = await prisma.playerState.findUnique({
    where: { userId },
  });

  if (!playerState) {
    throw new Error(`PlayerState not found for user ${userId}`);
  }

  return prisma.affinity.upsert({
    where: {
      playerStateId_characterId: {
        playerStateId: playerState.id,
        characterId,
      },
    },
    create: { playerStateId: playerState.id, characterId, value },
    update: { value },
  });
}
