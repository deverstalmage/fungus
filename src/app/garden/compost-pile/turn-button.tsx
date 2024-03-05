'use client';
import turnCompost from './turn-compost';
import styles from './turn-button.module.css';
import { useRouter } from 'next/navigation';
import { BaseItem, Item } from '@/db/items';
import notify from '@/lib/notify';
import GetItem from '@/app/get-item';

export default function TurnButton({ canTurn = false }) {
  const router = useRouter();



  const withToast = async () => {
    const droppedItems = await turnCompost();
    if (!droppedItems) return;
    for (const item of droppedItems) {
      notify(GetItem({ item }));
    }
    router.refresh();
    return droppedItems;
  };

  return (
    <form action={withToast}>
      <button className={styles.button} type="submit" disabled={!canTurn}>Turn those leaves</button>
    </form>
  );
}