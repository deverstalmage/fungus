'use client';
import notify from '@/lib/notify';
import forageAction from './forage';
import styles from './forage-button.module.css';
import { getFungus } from '@/db/fungi';
import { getItem } from '@/db/items';
// import { useRouter } from 'next/navigation';

export default function ForageButton() {
  // const router = useRouter();

  const action = async () => {
    const results = await forageAction([]);
    if (!results) return;

    notify(
      <>
        <p>Got fungi: {JSON.parse(results.fungusIds).map((r: number) => getFungus(r)?.name)}</p>
        <p>Got items: {JSON.parse(results.itemIds).map((r: number) => getItem(r)?.name)}</p>
      </>
    );
  };

  const canForage = true; // make sure there is enough energy to go foraging

  return (
    <form action={action}>
      <button className={styles.button} type="submit" disabled={!canForage}>Go foraging</button>
    </form>
  );
}