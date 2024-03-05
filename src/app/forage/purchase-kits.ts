'use server';
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";

export default async function purchaseKits(num: number) {
  const user = await getCurrentUser();
  if (!user) return;
  const kits = [];
  for (let i = 0; i < num; i++) {
    kits.push({ itemId: 4 });
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      gold: user.gold - 1000,
      items: {
        create: kits,
      }
    },
    include: {
      items: true,
    }
  });
}