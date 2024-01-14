'use server';
import { DateTime } from 'luxon';
import { Rarity, roll, randomNum, randomFrequencyTableEntry } from '@/lib/rarity';
import { hasPassed } from '@/lib/time';
import { getItem, Item } from '@/db/items';
import prisma from '@/lib/prisma';
import { obtainItem, randomItem } from '@/lib/inventory';
import { turnInvervalDur } from './intervals';

const dropTable = [getItem(1), getItem(2), getItem(3)];
const dropFrequency = { 1: 1, 2: 0.25, 3: 0.01 };

export default async function turnCompost() {
  const user = await prisma.user.findUnique({ where: { id: 1 } });
  if (!user) return;

  const lastTurned = Number(user?.lastTurnedCompost);
  const lastTurnedDateTime = DateTime.fromMillis(lastTurned);

  if (hasPassed(lastTurnedDateTime.plus(turnInvervalDur))) {

    const items = [];
    const numDrops = randomFrequencyTableEntry(dropFrequency) as number || 0;
    for (let i = 0; i < numDrops; i++) {
      const d = randomItem(dropTable);
      items.push(d);
      await obtainItem(d.id);
    }

    console.log(`ITEMS`, items);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastTurnedCompost: DateTime.now().valueOf(),
      },
    });

    return items;
  }
};