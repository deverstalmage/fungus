import getCurrentUser from "@/lib/user";
import prisma from "@/lib/prisma";
import { CombinedFungus, getFungus, combineFungusRecord } from "@/db/fungi";
import { getItem } from "@/db/items";

export default async function getPageData(plotId: number) {
  const user = await getCurrentUser();
  const plot = await prisma.gardenPlot.findUnique({ where: { userId: user?.id, id: Number(plotId) } });
  const fungi = (await prisma.fungus.findMany({ where: { userId: user?.id } }));
  const inventory = (await prisma.item.findMany({ where: { userId: user?.id } })).map(i => ({ uid: i.id, ...getItem(i.itemId) }));

  const plantedFungi: Array<CombinedFungus> = fungi.filter(f => f.gardenPlotId === plot?.id).map(f => combineFungusRecord(f));
  const availableFungi: Array<CombinedFungus> = fungi.filter(f => !f.gardenPlotId).map(f => combineFungusRecord(f));

  if (!user || !plot) throw new Error();

  return { user, gardenPlot: plot, plantedFungi, availableFungi, inventory };
}