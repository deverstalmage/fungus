import styles from './item-card.module.css';
import { Item } from '@/db/items';

export default function Item({ item }: { item: Item; }) {
  return (
    <div className={styles.item}>
      <p>{item.name}</p>
    </div>
  );
}