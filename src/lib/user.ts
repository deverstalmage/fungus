import prisma from "@/lib/prisma";

const currentUserId = 1;

export default function getCurrentUser() {
  return prisma.user.findUnique({
    where: {
      id: currentUserId
    },
    include: {
      items: true,
      fungi: true,
      gardenPlots: true,
      forageResults: true
    }
  });
}