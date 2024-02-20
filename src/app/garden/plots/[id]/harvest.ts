'use server';
import { hasPassed } from '@/lib/time';
import { SubstrateItem, getItem } from "@/db/items";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import { DateTime } from "luxon";
import { CombinedFungus, Fungus, getFungus } from '@/db/fungi';
import combineFungusRecord from '@/lib/fungus-records';

export default async function harvest(fungusId: number) {
  const user = await getCurrentUser();
  const fRecord = await prisma.fungus.findUnique({ where: { id: fungusId } });
  if (!user || !fRecord || !fRecord.growthMediumItemId) return;

  const fungus = combineFungusRecord(fRecord);
  const substrate = getItem(fRecord.growthMediumItemId) as SubstrateItem;
  const lastHarvested = Number(fungus.lastHarvested);
  const lastHarvestedDateTime = DateTime.fromMillis(lastHarvested);

  const timeToHarvest = fungus.msToHarvest * substrate.harvestTimeMultiplier;

  if (hasPassed(lastHarvestedDateTime.plus({ milliseconds: timeToHarvest }))) {

    const currentFruit = user.fruit;
    const newFruit = fungus.yield * substrate.harvestYieldMultiplier;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        fruit: currentFruit + newFruit,
      },
    });
  }
}
