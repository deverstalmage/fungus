import getCurrentUser from "@/lib/user";
import prisma from "@/lib/prisma";
import { getFungus } from "@/db/fungi";
import { getItem } from "@/db/items";

export default async function getPageData(plotId: number) {
  const user = await getCurrentUser();
  const plot = await prisma.gardenPlot.findUnique({ where: { userId: user?.id, id: Number(plotId) } });
  const fungi = (await prisma.fungus.findMany({ where: { userId: user?.id } }));
  const growthMediums = (await prisma.item.findMany({ where: { userId: user?.id } })).map(i => ({ uid: i.id, ...getItem(i.itemId) })).filter(i => i.type === 'Substrate');

  const plantedFungi = fungi.filter(f => f.gardenPlotId === plot?.id).map(f => ({ uid: f.id, lastHarvested: f.lastHarvested, spaceIndex: f.spaceIndex || undefined, growthMediumItemId: f.growthMediumItemId, ...getFungus(f.fungusId) }));
  const availableFungi = fungi.filter(f => !f.gardenPlotId).map(f => ({ uid: f.id, ...getFungus(f.fungusId) }));

  if (!user || !plot) throw new Error();

  return { user, gardenPlot: plot, plantedFungi, availableFungi, growthMediums };
}