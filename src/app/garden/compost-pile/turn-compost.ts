'use server';
import { DateTime } from 'luxon';
import { randomFrequencyTableEntry } from '@/lib/rarity';
import { hasPassed } from '@/lib/time';
import { Item, ItemLibrary, getItem } from '@/db/items';
import prisma from '@/lib/prisma';
import { obtainItem, randomThing } from '@/lib/inventory';
import { turnInvervalDur } from './intervals';
import getCurrentUser from '@/lib/user';

const dropTable = ItemLibrary.filter(i => i.type === 'Fertilizer');
const dropFrequency = { 1: 1, 2: 0.25, 3: 0.01 };

export default async function turnCompost() {
  const user = await getCurrentUser();
  if (!user) return;

  const lastTurned = Number(user?.lastTurnedCompost);
  const lastTurnedDateTime = DateTime.fromMillis(lastTurned);

  if (hasPassed(lastTurnedDateTime.plus(turnInvervalDur))) {

    const items = [];
    const numDrops = randomFrequencyTableEntry(dropFrequency) as number || 0;
    for (let i = 0; i < numDrops; i++) {
      const d = randomThing(dropTable) as Item;
      items.push(d);
      await obtainItem(d.id);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastTurnedCompost: DateTime.now().valueOf(),
      },
    });

    return items;
  }
};