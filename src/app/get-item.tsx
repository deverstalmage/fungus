import styles from './get-item.module.css';
import type { Item } from '@/db/items';
import ItemCard from '@/app/item-card';

export default function GetItem({ item }: { item: Item; }) {
  return (
    <div>
      <p className={styles.newItem}>New item!</p>
      <ItemCard item={item} />
    </div>
  );
}