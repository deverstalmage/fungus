'use client';
import { useFormState } from 'react-dom';
import turnCompost from './turn-compost';


export default function TurnButton({ canTurn = false }) {
  const [droppedItem, action] = useFormState(turnCompost, null);
  return (
    <div>
      <form action={action}>
        {droppedItem && (<p>Got the {droppedItem.name}!</p>)}
        <button type="submit" disabled={!canTurn}>Turn those leaves</button>
      </form>
    </div>
  );
}