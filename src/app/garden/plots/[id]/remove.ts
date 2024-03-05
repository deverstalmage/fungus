'use server';
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";

export default async function remove(fungusId: number, useKit: boolean) {
  const user = await getCurrentUser();
  if (!user) return;



  if (useKit) {
    const kit = await prisma.item.findFirst({ where: { userId: user.id, itemId: 4 } });
    if (!kit) return false;

    await prisma.item.delete({
      where: { id: kit.id },
    });

    const f = await prisma.fungus.update({
      where: { id: fungusId, userId: user.id },
      data: {
        gardenPlot: {
          disconnect: true,
        },
      },
      include: {
        gardenPlot: true,
      }
    });

    return f;
  } else {
    const f = await prisma.fungus.delete({
      where: { id: fungusId, userId: user.id }
    });

    return f;
  }
}
