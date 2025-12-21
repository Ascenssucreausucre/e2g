import { prisma } from "../prisma/client";
import { randomUUID } from "crypto";

export async function createChapter(title: string, id?: string) {
  return prisma.chapter.create({
    data: { id: id || randomUUID(), title },
  });
}

export async function getChapterById(id: string) {
  return prisma.chapter.findUnique({
    where: { id },
  });
}

export async function getAllChapters() {
  return prisma.chapter.findMany();
}

export async function deleteChapter(id: string) {
  return prisma.chapter.delete({
    where: { id },
  });
}

export async function updateChapter(
  id: string,
  {
    title,
    order,
    cost,
    active,
  }: { title?: string; order?: string; cost?: number; active?: boolean }
) {
  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = title;
  if (order !== undefined) data.order = order;
  if (cost !== undefined) data.cost = cost;
  if (active !== undefined) data.active = active;

  if (Object.keys(data).length === 0) {
    throw new Error("No fields provided to update");
  }

  return prisma.chapter.update({
    where: { id },
    data,
  });
}
