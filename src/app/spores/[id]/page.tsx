import RarityDisplay from "@/app/rarity-display";
import { getFungus } from "@/db/fungi";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";

export default async function ExamineFungus({ params: { id } }: { params: { id: number; }; }) {
  const user = await getCurrentUser();
  const fungi = await prisma.fungus.findMany({ where: { userId: user?.id, fungusId: Number(id) } });
  if (fungi.length <= 0) throw new Error();

  const fungus = getFungus(fungi[0].fungusId);

  return (
    <div>
      <h1>{fungus.name}</h1>
      <div>
        <RarityDisplay rarity={fungus.rarity} />
      </div>
    </div>
  );
}