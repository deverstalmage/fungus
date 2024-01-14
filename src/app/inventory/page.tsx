import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import { getItem } from "@/db/items";
import ItemCard from "@/app/item-card";
import styles from './page.module.css';

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
      <div className={styles.inventory}>
        {items.map((item, i) => <div key={i} className={styles.itemSlot}><ItemCard key={i} item={item} /></div>)}
      </div>
    </div>
  );
}