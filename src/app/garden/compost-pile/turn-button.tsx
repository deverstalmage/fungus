'use client';
import { useFormState } from 'react-dom';
import turnCompost from './turn-compost';
import { toast } from 'react-toastify';
import styles from './turn-button.module.css';


export default function TurnButton({ canTurn = false }) {

  const withToast = async () => {
    const droppedItem = await turnCompost();
    toast('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return droppedItem;
  };

  const [droppedItem, action] = useFormState(withToast, null);
  return (
    <div>
      <form action={action}>
        {droppedItem && (<p>Got the {droppedItem.name}!</p>)}
        <button className={styles.button} type="submit" disabled={!canTurn}>Turn those leaves</button>
      </form>
    </div>
  );
}