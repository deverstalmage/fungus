import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import { getItem } from "@/db/items";
import { getFungus } from "@/db/fungi";
import ItemCard from "@/app/item-card";
import FungusCard from '@/app/fungus-card';
import styles from './page.module.css';
import Link from "next/link";

export default async function Inventory() {
  const currentUser = await getCurrentUser();
  const userClause = {
    where: {
      userId: currentUser?.id,
    }
  };

  const items = (await prisma.item.findMany(userClause)).map(i => getItem(i.itemId));
  const fungi = (await prisma.fungus.findMany(userClause)).map(i => getFungus(i.fungusId));

  return (
    <div>
      <h1>Inventory</h1>
      <h2>Fungus</h2>

      <div className={styles.inventory}>
        {fungi.map((fungus, i) => <div key={i} className={styles.itemSlot}><FungusCard key={i} fungus={fungus} /></div>)}
      </div>

      <h2>Items</h2>
      <div className={styles.inventory}>
        {items.map((item, i) => <div key={i} className={styles.itemSlot}><ItemCard key={i} item={item} /></div>)}
      </div>
      <p><Link href="/">Return home</Link></p>
    </div>
  );
}