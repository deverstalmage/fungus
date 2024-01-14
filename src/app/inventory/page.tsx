import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import { getItem } from "@/db/items";

export default async function Inventory() {
  const currentUser = await getCurrentUser();
  const items = (await prisma.item.findMany({
    where: {
      userId: currentUser?.id,
    }
  })).map(i => getItem(i.itemId));

  console.log(items);

  return (
    <div>
      <h1>Inventory</h1>
      <ol>
        {items.map((item, i) => <li key={i}>{item.name}</li>)}
      </ol>
    </div>
  );
}