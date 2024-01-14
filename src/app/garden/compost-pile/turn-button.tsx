'use client';
import turnCompost from './turn-compost';
import styles from './turn-button.module.css';
import { alertItem } from '@/lib/inventory';
import { useRouter } from 'next/navigation';

export default function TurnButton({ canTurn = false }) {
  const router = useRouter();

  const withToast = async () => {
    const droppedItem = await turnCompost();
    if (!droppedItem) return;
    alertItem(droppedItem);
    router.refresh();
    return droppedItem;
  };

  return (
    <form action={withToast}>
      <button className={styles.button} type="submit" disabled={!canTurn}>Turn those leaves</button>
    </form>
  );
}