'use client';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Rarity, roll } from '@/lib/rarity';
import { hasPassed, timeUntil } from '@/lib/time';

const dropTable = [
  { name: 'Compost', rarity: 'Common' },
  { name: 'Slug', rarity: 'Uncommon' },
];

function drop(): string {
  const rarity = roll(dropTable.map(i => i.rarity as Rarity));
  const items = dropTable.filter(item => item.rarity === rarity);
  return items[Math.floor(Math.random() * items.length)].name;
}

const turnIntervalMilli = 1000 * 60 * 5;
const turnInvervalDur = { milliseconds: turnIntervalMilli };

export default function CompostPile() {
  const [lastTurned, setLastTurned] = useLocalStorage('compost-last-turned', DateTime.now().valueOf());

  const turn = () => {
    if (canTurn) {
      console.log('Got item: ', drop());
      setLastTurned(DateTime.now().valueOf());
    }
  };

  const lastTurnedDateTime = DateTime.fromMillis(lastTurned);
  const nextAvailable = timeUntil(lastTurnedDateTime, turnInvervalDur);
  const canTurn = hasPassed(lastTurnedDateTime.plus(turnInvervalDur));

  return (
    <main>
      <h1>Compost Pile</h1>
      <h2>It doesn&rsquo;t smell that great here...</h2>
      <p>Compost was last turned {lastTurnedDateTime.toRelative({ unit: ['hours', 'minutes', 'seconds'] })}</p>
      <p>Turn the leaves again {nextAvailable}</p>
      <p><button disabled={!canTurn} onDoubleClick={turn}>Turn those leaves</button></p>
      <p><Link href="/garden">Back to the garden</Link></p>
    </main>
  );
}
