import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import Link from "next/link";

export default async function Garden() {
  const user = await getCurrentUser();
  const plots = await prisma.gardenPlot.findMany({ where: { userId: user?.id } });

  return (
    <main>
      <h1>The Garden</h1>
      <h2>Select a plot:</h2>
      <ul>
        {plots.map((p, i) => <li key={i}><Link href={`/garden/plots/${p.id}`}>Plot {p.id}</Link></li>)}
      </ul>
      <p><Link href="/garden/compost-pile">Check out the compost pile</Link></p>
    </main>
  );
}