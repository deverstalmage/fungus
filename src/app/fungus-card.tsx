import styles from './card.module.css';
import { Fungus } from '@/db/fungi';
import Image from 'next/image';
import RarityDisplay from './rarity-display';

export default function Fungus({ fungus }: { fungus: Fungus; }) {
  console.log(fungus.name.toLowerCase().replace(' ', '-'));
  return (
    <div className={styles.card}>
      <div className={styles.type}>{fungus.type}</div>
      <div className={styles.imgFrame}>
        <Image src={`/fungi/${fungus.name.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replaceAll(' ', '-')}.png`} alt={fungus.name} width={160} height={120} />
      </div>
      <p>{fungus.name}</p>
      <RarityDisplay rarity={fungus.rarity} />
    </div>
  );
}