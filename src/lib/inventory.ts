import prisma from "@/lib/prisma";
import { Item, getItem } from "@/db/items";
import getCurrentUser from "@/lib/user";
import { toast } from "react-toastify";
import GetItem from '@/app/get-item';
import { Rarity, roll } from "./rarity";

export async function alertItem(items: Item[]) {
  for (const item of items) {
    toast(() => GetItem({ item }), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: true,
      theme: "light",
    });
  }
}

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

    await prisma.item.create({
      data: {
        userId,
        itemId,
      },
    });
  } catch (e) {
    alert(e);
  }

  return;
}

export function randomItem(table: Array<Item>): Item {
  const rarity = roll(table.map(i => i.rarity as Rarity));
  const items = table.filter(item => item.rarity === rarity);
  return items[Math.floor(Math.random() * items.length)];
}

export default function getInventory() {

}