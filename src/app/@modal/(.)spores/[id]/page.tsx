import Modal from "@/app/modal";
import RarityDisplay from "@/app/rarity-display";
import { getFungus } from "@/db/fungi";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";

export default async function ExamineFungus({ params: { id } }: { params: { id: number; }; }) {
  const user = await getCurrentUser();
  const items = await prisma.fungus.findMany({ where: { userId: user?.id, fungusId: Number(id) } });
  if (items.length <= 0) throw new Error();

  const item = getFungus(items[0].fungusId);

  return (
    <Modal>
      <h1>{item.name}</h1>
      <div>
        <RarityDisplay rarity={item.rarity} />
      </div>
    </Modal>
  );
}