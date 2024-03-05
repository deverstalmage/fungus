'use server';
import { Fungus, getFungus } from "@/db/fungi";
import { Item, getItem } from "@/db/items";
import { getInventory } from "@/lib/inventory";
import prisma from "@/lib/prisma";
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

  const collectionKits = (await getInventory(user)).filter(i => i.id === 4);
  if (selectedFungi.length && selectedFungi.length <= collectionKits.length) {

    const usedKits = [];
    for (let i = 0; i < selectedFungi.length; i++) {
      usedKits.push({ id: collectionKits[i].uid });
    }

    console.log(`using ${usedKits.length} kits`);

    const fungi = JSON.parse(results.fungusIds).map((r: number) => getFungus(r));
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


  const items = JSON.parse(results.itemIds).map((r: number) => getItem(r));
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

  await prisma.forageResults.update({
    where: {
      id: forageResultsId,
    },
    data: {
      collectedDate: DateTime.now().valueOf(),
    }
  });
}