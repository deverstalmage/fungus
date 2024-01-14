import styles from './rarity-display.module.css';
import { Rarity, rarityStars } from '@/lib/rarity';

export default function RarityDisplay({ rarity }: { rarity: Rarity; }) {
  let rarityClass = rarity.toString();
  if (rarity === 'Ultra Rare') rarityClass = 'UltraRare';
  return (
    <p className={styles[rarity]}>{rarity} {rarityStars[rarity]}</p>
  );
}