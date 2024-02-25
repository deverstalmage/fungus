'use server';
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import { Fungus, FungusLibrary } from '@/db/fungi';
import { randomFrequencyTableEntry } from "@/lib/rarity";
import { randomThing } from "@/lib/inventory";
import { Item, getItem, ItemLibrary } from "@/db/items";

const fungusNumDropsTable = {
  3: 1,
  4: 0.5,
  5: 0.25,
  6: 0.10,
  7: 0.05,
  8: 0.03,
  9: 0.02,
  10: 0.01
};

const itemDropTable = ItemLibrary.filter(i => i.type === 'Fertilizer');
const itemNumDropsTable = {
  0: 1,
  1: 0.25,
  2: 0.05,
  3: 0.005
};


export default async function forage(usedItemIds: Array<number>) {
  const user = await getCurrentUser();
  const usedItems = await prisma.item.findMany({ where: { id: { in: usedItemIds } } });
  if (!user || user?.energy < 10) return;

  const fungi: Array<Fungus> = [];
  const fungusNumDrops = randomFrequencyTableEntry(fungusNumDropsTable) as number;
  console.log(fungusNumDrops);
  for (let i = 0; i < fungusNumDrops; i++) {
    const d = randomThing(FungusLibrary);
    fungi.push(d as Fungus);
  }

  const items: Array<Item> = [];
  const itemNumDrops = randomFrequencyTableEntry(itemNumDropsTable) as number;
  for (let i = 0; i < itemNumDrops; i++) {
    const d = randomThing(itemDropTable);
    items.push(d as Item);
  }

  const results = await prisma.forageResults.create({
    data: {
      userId: user.id,
      fungusIds: JSON.stringify(fungi.map(f => f.id)),
      itemIds: JSON.stringify(items.map(i => i.id)),
    }
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      energy: user.energy - 10,
    }
  });

  return results;
}