'use client'
import { DateTime } from 'luxon';
import Link from 'next/link'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Rarity, roll } from '@/lib/rarity';

const dropTable = [
  { name: 'Compost', rarity: 'Common' },
  { name: 'Slug', rarity: 'Uncommon' }
];

function drop(): string {
  const rarity = roll(dropTable.map(i => i.rarity as Rarity));
  const items = dropTable.filter(item => item.rarity === rarity);
  return items[Math.floor(Math.random() * items.length)].name;
}

function timeSince(date: DateTime) {

  const seconds = Math.floor((DateTime.now().valueOf() - date.valueOf()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export default function CompostPile() {
  const [lastTurned, setLastTurned] = useLocalStorage('compost-last-turned', DateTime.now());

  const turn = () => {
    if (canTurn) {
      console.log('Got item: ', drop());
      setLastTurned(DateTime.now().valueOf());
    }
  };

  const canTurn = lastTurned <= (DateTime.now().valueOf() - 1000 * 60 * 5); // 5 min
  const lastTurnedAgo = timeSince(DateTime.fromMillis(lastTurned));

  return (
    <main>
      <h1>Compost Pile</h1>
      <h2>It doesn&rsquo;t smell that great here...</h2>
      <p>Compost was last turned {lastTurnedAgo} ago</p>
      <p><button disabled={!canTurn} onDoubleClick={turn}>Turn those leaves</button></p>
      <p><Link href="garden">Back to the garden</Link></p>
    </main>
  )
}
