import styles from './card.module.css';
import { Item } from '@/db/items';
import Image from 'next/image';
import RarityDisplay from './rarity-display';

export default function Item({ item }: { item: Item; }) {
  return (
    <div className={styles.card}>
      <div className={styles.type}>Consumable</div>
      <div className={styles.imgFrame}>
        <Image src={`/items/${item.name.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replaceAll(' ', '-')}.png`} alt={item.name} width={160} height={120} />
      </div>
      <p>{item.name}</p>
      <RarityDisplay rarity={item.rarity} />
    </div>
  );
}