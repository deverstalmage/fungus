import getCurrentUser from "@/lib/user";
import prisma from "@/lib/prisma";
import { getFungus } from "@/db/fungi";
import { getItem } from "@/db/items";

export default async function getPageData(plotId: number) {
  const user = await getCurrentUser();
  const plot = await prisma.gardenPlot.findUnique({ where: { userId: user?.id, id: Number(plotId) } });
  const fungi = (await prisma.fungus.findMany({ where: { userId: user?.id } }));
  const growthMediums = (await prisma.item.findMany({ where: { userId: user?.id } })).map(i => getItem(i.itemId)).filter(i => i.type === 'Growth Medium');

  const plantedFungi = fungi.filter(f => f.gardenPlotId === plot?.id).map(f => getFungus(f.fungusId));
  const availableFungi = fungi.filter(f => !f.gardenPlotId).map(f => getFungus(f.fungusId));

  if (!user || !plot) throw new Error();

  return { user, gardenPlot: plot, plantedFungi, availableFungi, growthMediums };
}