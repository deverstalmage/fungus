'use client';
import { User } from '@prisma/client';
import styles from './status-bar.module.css';
import refillEnergy from './refill-energy';
import { useRouter } from 'next/navigation';

export default function RarityDisplay({ user }: { user: User; }) {
  const router = useRouter();
  const refill = async () => {
    refillEnergy(user.id);
    router.refresh();
  };

  return (
    <>
      <div className={styles.hud}>
        <div>Energy: [ {user.energy || 0} / 100 ]</div>
        <form action={refill}>
          <button type="submit">Refill energy</button>
        </form>
        <div>Fruit: {user.fruit || 0}</div>
        <div>Gold: {user.gold || 0}</div>
      </div>
    </>
  );
}