import { DateTime } from "luxon";
import prisma from "@/lib/prisma";
import { getItem } from "@/db/items";
import getCurrentUser from "@/lib/user";


export async function obtainItem(id: number) {
  const { id: itemId } = getItem(id);
  const user = await getCurrentUser();

  if (!user) return;
  const userId = user.id;

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
}


export default function getInventory() {

}