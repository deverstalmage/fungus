import styles from './card.module.css';
import { Fungus } from '@/db/fungi';
import Image from 'next/image';
import RarityDisplay from './rarity-display';
import Link from 'next/link';

const Wrapper = ({ linked, fungus, children, onClick }: { linked: boolean, fungus: Fungus, children: React.ReactNode; onClick?: (item: Fungus) => void; }) =>
  linked ?
    <Link href={`/inventory/${fungus.id}`}>{children}</Link> :
    <div onClick={() => onClick && onClick(fungus)}>{children}</div>;

export default function FungusCard({ fungus, linked = true, onClick }: { linked?: boolean; onClick?: () => Fungus; fungus: Fungus; }) {
  return (
    <>
      <Wrapper linked={linked} fungus={fungus} onClick={onClick}>
        <div className={styles.card}>
          <div className={styles.type}>{fungus.type}</div>
          <div className={styles.imgFrame}>
            <Image src={`/fungi/${fungus.name.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replaceAll(' ', '-')}.png`} alt={fungus.name} width={160} height={120} />
          </div>
          <p>{fungus.name}</p>
          <RarityDisplay rarity={fungus.rarity} />
        </div>
      </Wrapper>
    </>
  );
}