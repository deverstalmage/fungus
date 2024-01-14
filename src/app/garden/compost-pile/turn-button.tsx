'use client';
import { useFormState } from 'react-dom';
import turnCompost from './turn-compost';
import styles from './turn-button.module.css';
import { alertItem } from '@/lib/inventory';


export default function TurnButton({ canTurn = false }) {

  const withToast = async () => {
    const droppedItem = await turnCompost();
    if (!droppedItem) return;
    alertItem(droppedItem);
    return droppedItem;
  };

  const [droppedItem, action] = useFormState(withToast, null);
  return (
    <form action={action}>
      <button className={styles.button} type="submit" disabled={!canTurn}>Turn those leaves</button>
    </form>
  );
}