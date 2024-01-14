'use client';
import forageAction from './forage';
import styles from './forage-button.module.css';
// import { useRouter } from 'next/navigation';

export default function ForageButton({ canTurn = false }) {
  // const router = useRouter();

  const action = async () => {
    const f = await forageAction();
  };

  const canForage = true; // make sure there is enough energy to go foraging

  return (
    <form action={action}>
      <button className={styles.button} type="submit" disabled={!canForage}>Go foraging</button>
    </form>
  );
}