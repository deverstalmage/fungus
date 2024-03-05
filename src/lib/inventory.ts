import prisma from "@/lib/prisma";
import { Item, getItem } from "@/db/items";
import getCurrentUser from "@/lib/user";
import GetItem from '@/app/get-item';
import { Rarity, roll } from "./rarity";
import notify from "./notify";
import { Fungus } from "@/db/fungi";
import { User } from "@prisma/client";

export async function obtainItem(id: number) {
  const item = getItem(id);
  const itemId = item.id;
  const user = await getCurrentUser();

  if (!user) return;
  const userId = user.id;

  try {
    await prisma.item.create({
      data: {
        itemId,
        userId,
      },
    });
  } catch (e) {
    alert(e);
  }

  return;
}

export function randomThing(table: Array<Item | Fungus>): Item | Fungus {
  const rarity = roll(table.map(t => t.rarity as Rarity));
  const things = table.filter(t => t.rarity === rarity);
  return things[Math.floor(Math.random() * things.length)];
}

export async function getInventory(u?: User) {
  const user = u || await getCurrentUser();
  const items = await prisma.item.findMany({ where: { userId: user?.id } });
  return items.map(i => getItem(i.itemId));
}