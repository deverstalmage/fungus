import Modal from "@/app/modal";
import RarityDisplay from "@/app/rarity-display";
import { getItem } from "@/db/items";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";

export default async function ExamineInventoryItem({ params: { id } }: { params: { id: number; }; }) {
  const user = await getCurrentUser();
  const items = await prisma.item.findMany({ where: { userId: user?.id, itemId: Number(id) } });
  if (items.length <= 0) throw new Error();

  const item = getItem(items[0].id);

  return (
    <Modal>
      <h1>{item.name}</h1>
      <RarityDisplay rarity={item.rarity} />
    </Modal>
  );
}