import { DateTime } from 'luxon';
import Link from 'next/link';
import { hasPassed, timeUntil } from '@/lib/time';
import TurnButton from './turn-button';
import { turnInvervalDur } from './intervals';
import getCurrentUser from '@/lib/user';

export default async function CompostPile() {
  const user = await getCurrentUser();
  const lastTurned = Number(user?.lastTurnedCompost);
  const lastTurnedDateTime = DateTime.fromMillis(lastTurned);
  const canTurn = hasPassed(lastTurnedDateTime.plus(turnInvervalDur));
  const nextAvailable = timeUntil(lastTurnedDateTime, turnInvervalDur);

  return (
    <main>
      <h1>Compost Pile</h1>
      <h2>It doesn&rsquo;t smell that great here...</h2>
      <p>Compost was last turned {lastTurnedDateTime.toRelative({ unit: ['hours', 'minutes', 'seconds'] })}</p>
      <p>Turn the leaves again {nextAvailable}</p>
      <TurnButton canTurn={canTurn} />
      <p><Link href="/garden">Back to the garden</Link></p>
    </main>
  );
}
