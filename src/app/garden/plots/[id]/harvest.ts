'use server';
import { hasPassed } from '@/lib/time';
import { SubstrateItem, getItem } from "@/db/items";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import { DateTime } from "luxon";
import { combineFungusRecord } from '@/db/fungi';

export default async function harvest(fungusId: number) {
  const user = await getCurrentUser();
  const fRecord = await prisma.fungus.findUnique({ where: { id: fungusId } });
  if (!user || !fRecord || !fRecord.growthMediumItemId) return;

  const fungus = combineFungusRecord(fRecord);
  const substrate = getItem(fRecord.growthMediumItemId) as SubstrateItem;
  const lastHarvested = Number(fungus.lastHarvested);
  const lastHarvestedDateTime = DateTime.fromMillis(lastHarvested);
  const timeToHarvest = fungus.msToHarvest * substrate.harvestTimeMultiplier;

  console.log(lastHarvested, timeToHarvest);

  if (hasPassed(lastHarvestedDateTime.plus({ milliseconds: timeToHarvest }))) {

    const currentFruit = user.fruit;
    const newFruit = fungus.yield * substrate.harvestYieldMultiplier;

    const results = await Promise.all([
      prisma.fungus.update({
        where: { id: fungus.uid },
        data: {
          lastHarvested: DateTime.now().valueOf()
        }
      }),

      prisma.user.update({
        where: { id: user.id },
        data: {
          fruit: currentFruit + newFruit,
        },
      })
    ]);

    return newFruit;
  } else {
    return false;
  }
}
