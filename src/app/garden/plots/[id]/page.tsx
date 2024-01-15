import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Plot({ params: { id } }: { params: { id: number; }; }) {
  const plot = await prisma.gardenPlot.findUnique({ where: { id: Number(id) } });
  if (!plot) return;

  return (
    <div>
      <div>Plot: {plot.id}</div>

      <p><Link href="/garden">Back to garden entrance</Link></p>
    </div>
  );
}