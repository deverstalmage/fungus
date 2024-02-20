'use server';
import prisma from '@/lib/prisma';
import getCurrentUser from '@/lib/user';
import { DateTime } from 'luxon';

export default async function seed(itemUid: number, fungusUid: number, plotId: number, space: number) {
  const user = await getCurrentUser();
  const fungus = await prisma.fungus.findUnique({ where: { id: fungusUid, userId: user?.id, gardenPlotId: null } });
  const item = await prisma.item.findUnique({ where: { id: itemUid, userId: user?.id } });

  if (user && fungus && item) {
    try {
      const f = await prisma.fungus.update({
        where: { id: fungusUid },
        data: {
          gardenPlotId: plotId,
          spaceIndex: space,
          lastHarvested: DateTime.now().valueOf(),
        }
      });
      // await prisma.item.delete({ where: { id: itemUid } });
      return f;
    } catch (e) {
      return false;
    }
  }

  return false;
}