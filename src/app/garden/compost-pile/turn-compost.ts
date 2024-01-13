'use server';
import { DateTime } from 'luxon';
import { Rarity, roll } from '@/lib/rarity';
import { hasPassed, timeUntil } from '@/lib/time';
import { getItem, Item } from '@/db/items';
import prisma from '@/lib/prisma';
import { obtainItem } from '@/lib/inventory';

const turnIntervalMilli = 1000;// * 60 * 5;
const turnInvervalDur = { milliseconds: turnIntervalMilli };

const dropTable = [getItem(1), getItem(2)];

function drop(table: Array<Item>): Item {
  const rarity = roll(table.map(i => i.rarity as Rarity));
  const items = table.filter(item => item.rarity === rarity);
  return items[Math.floor(Math.random() * items.length)];
}

export default async function turnCompost() {
  const user = await prisma.user.findUnique({ where: { id: 1 } });
  if (!user) return;

  const lastTurned = Number(user?.lastTurnedCompost);
  const lastTurnedDateTime = DateTime.fromMillis(lastTurned);

  if (hasPassed(lastTurnedDateTime.plus(turnInvervalDur))) {

    const droppedItem = drop(dropTable);
    await obtainItem(droppedItem.id);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastTurnedCompost: DateTime.now().valueOf(),
      },
    });

    return droppedItem;
  }
};