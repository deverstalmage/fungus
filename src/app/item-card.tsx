import styles from './item-card.module.css';
import { Item } from '@/db/items';
import Image from 'next/image';
import RarityDisplay from './rarity-display';

export default function Item({ item }: { item: Item; }) {
  return (
    <div className={styles.item}>
      <div className={styles.imgFrame}>
        <Image src={`/${item.name.toLowerCase()}.png`} alt={item.name} width={180} height={200} />
      </div>
      <p>{item.name}</p>
      <RarityDisplay rarity={item.rarity} />
    </div>
  );
}