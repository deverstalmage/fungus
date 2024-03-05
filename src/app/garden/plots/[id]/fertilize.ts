'use server';

import { combineFungusRecord, getFungus } from "@/db/fungi";
import { FertilizerItem, getItem } from "@/db/items";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";

export default async function fertilize(fungusId: number, itemId: number) {
  const user = await getCurrentUser();
  if (!user) return;

  const i = await prisma.item.findUnique({ where: { id: itemId } });
  const f = await prisma.fungus.findUnique({ where: { id: fungusId } });

  if (!f || !i) return;

  const item = getItem(i.itemId) as FertilizerItem;
  const fungus = combineFungusRecord(f);

  await prisma.fungus.update({
    where: {
      id: fungusId,
    },
    data: {
      lastHarvested: Number(fungus.lastHarvested) + item.harvestTimeReduction
    }
  });

  await prisma.item.delete({ where: { id: itemId } });
}