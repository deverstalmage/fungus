import styles from './card.module.css';
import { Item } from '@/db/items';
import Image from 'next/image';
import RarityDisplay from './rarity-display';
import Link from 'next/link';

const Wrapper = ({ linked, item, children, onClick }: { linked: boolean, item: Item, children: React.ReactNode; onClick?: (item: Item) => void; }) =>
  linked ?
    <Link href={`/inventory/${item.id}`}>{children}</Link> :
    <div onClick={() => onClick && onClick(item)}>{children}</div>;

export default function Item({ item, linked = true, onClick }: { linked?: boolean; item: Item; onClick?: () => Item; }) {
  return (
    <>
      <Wrapper linked={linked} item={item} onClick={onClick}>
        <div className={styles.card}>
          <div className={styles.type}>{item.type}</div>
          <div className={styles.imgFrame}>
            <Image src={`/items/${item.name.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replaceAll(' ', '-')}.png`} alt={item.name} width={160} height={120} />
          </div>
          <p>{item.name}</p>
          <RarityDisplay rarity={item.rarity} />
        </div>
      </Wrapper>
    </>
  );
}