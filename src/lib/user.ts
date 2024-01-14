import prisma from "@/lib/prisma";

const currentUserId = 1;

export default async function getCurrentUser() {
  return prisma.user.findUnique({ where: { id: currentUserId } });
}