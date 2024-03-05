'use server';
import { Fungus, getFungus } from "@/db/fungi";
import { Item, getItem } from "@/db/items";
import { getInventory } from "@/lib/inventory";
import prisma from "@/lib/prisma";
import { fruitForRarity } from "@/lib/rarity";
import getCurrentUser from "@/lib/user";
import { DateTime } from "luxon";

export default async function collect(selectedFungi: Fungus[], forageResultsId: number) {
  const user = await getCurrentUser();
  if (!user) return;

  const results = await prisma.forageResults.findUnique({
    where: {
      id: forageResultsId,
    }
  });

  if (!results) return;

  const fungi: Fungus[] = JSON.parse(results.fungusIds).map((r: number) => getFungus(r));
  const items: Item[] = JSON.parse(results.itemIds).map((r: number) => getItem(r));
  const unselectedFungi: Fungus[] = [];
  const selectedFungiIds = [...selectedFungi].map(f => f.id);

  for (const f of fungi) {
    if (!selectedFungiIds.includes(f.id)) unselectedFungi.push(f);
    else {
      const idx = selectedFungiIds.findIndex(i => i === f.id);
      selectedFungiIds.splice(idx, 1);
    }
  }

  const collectionKits = (await getInventory(user)).filter(i => i.id === 4);
  if (selectedFungi.length && selectedFungi.length <= collectionKits.length) {

    const usedKits = [];
    for (let i = 0; i < selectedFungi.length; i++) {
      usedKits.push({ id: collectionKits[i].uid });
    }


    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        fungi: {
          create: fungi.map((f: Fungus) => ({ fungusId: f.id })),
        },
        items: {
          delete: usedKits,
        }
      },
      include: {
        fungi: true,
        items: true,
      }
    });
  }

  if (items.length) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        items: {
          create: items.map((i: Item) => ({ itemId: i.id })),
        }
      },
      include: {
        items: true,
      }
    });
  }

  [];

  const totalFruit = unselectedFungi.reduce((prev, current) => prev + fruitForRarity(current.rarity), 0);
  if (totalFruit) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        fruit: user.fruit + totalFruit,
      }
    });
  }


  await prisma.forageResults.update({
    where: {
      id: forageResultsId,
    },
    data: {
      collectedDate: DateTime.now().valueOf(),
    }
  });

  return {
    sporesObtained: selectedFungi,
    itemsObtained: items,
  };
}