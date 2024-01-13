import prisma from "@/lib/prisma";
import { DateTime } from 'luxon';
import { getItem, Item } from '@/db/items';

const dropTable = [getItem(1), getItem(2)];


const turnIntervalMilli = 1000 * 60 * 5;
const turnInvervalDur = { milliseconds: turnIntervalMilli };

const sessionUserId = 1;

export async function POST(request: Request) {
  const items = [1, 1, 2];

  const user = await prisma.user.findUnique({ where: { id: sessionUserId } });
  const lastTurned = user?.lastTurnedCompost;


  return Response.json({ items });
}