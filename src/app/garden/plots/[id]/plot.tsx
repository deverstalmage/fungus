import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import Link from "next/link";
import styles from './page.module.css';
import FungusCard from "@/app/fungus-card";
import { getFungus } from "@/db/fungi";

const plotSizeByLevel = [
  10,
  10,
  10,
  10,
  20,
  20,
  20,
  20,
  20,
  30,
  30,
  30,
  30,
  30,
  40,
  40,
  40,
  40,
  40,
  50
];

export default async function Plot({ id }: { id: number; }) {
  const user = await getCurrentUser();
  const plot = await prisma.gardenPlot.findUnique({ where: { userId: user?.id, id: Number(id) } });
  const fungi = (await prisma.fungus.findMany({ where: { userId: user?.id, gardenPlotId: plot?.id } })).map(f => getFungus(f.fungusId));
  if (!user || !plot) return;

  const plotSize = plotSizeByLevel[user.level - 1];
  const emptySpaceCount = plotSize - fungi.length;

  const emptySpaces = [];
  for (let i = 0; i < emptySpaceCount; i++) {
    emptySpaces.push(
      <div className={styles.emptySpace}>Empty Plot</div>
    );
  }

  return (
    <div>
      <h1>Plot: {plot.id}</h1>
      <div className={styles.plot}>
        {fungi.map((f, i) => <div key={i}><FungusCard fungus={f} /></div>)}
        {emptySpaces}
      </div>
    </div>
  );
}