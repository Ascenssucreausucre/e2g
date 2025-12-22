import { prisma } from "../prisma/client";

export function createCharacter(data: {
  name: string;
  description?: string;
  portrait?: string;
}) {
  return prisma.character.create({
    data,
  });
}

export function getCharacterById(id: number) {
  return prisma.character.findUnique({
    where: { id },
  });
}

export function getAllCharacters() {
  return prisma.character.findMany();
}

export function updateCharacter(
  id: number,
  updates: {
    name?: string;
    description?: string;
    portrait?: string;
  }
) {
  return prisma.character.update({
    where: { id },
    data: updates,
  });
}

export function deleteCharacter(id: number) {
  return prisma.character.delete({
    where: { id },
  });
}
