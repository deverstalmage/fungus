import { DateTime } from 'luxon';
import { hasPassed } from '@/lib/time';
import TurnButton from './turn-button';
import { turnInvervalDur } from './intervals';
import getCurrentUser from '@/lib/user';
import Countdown from '@/app/countdown';

export default async function CompostPile() {
  const user = await getCurrentUser();
  if (!user) return;

  const lastTurned = Number(user.lastTurnedCompost);
  const lastTurnedDateTime = DateTime.fromMillis(lastTurned);
  const nextTurn = lastTurnedDateTime.plus(turnInvervalDur).toISO();
  const canTurn = hasPassed(lastTurnedDateTime.plus(turnInvervalDur));

  return (
    <main>
      <h1>Compost Pile</h1>
      {/* <p>Compost was last turned {lastTurnedDateTime.toRelative({ unit: ['hours', 'minutes', 'seconds'] })}</p> */}
      <p>Turn the leaves again <Countdown date={nextTurn || DateTime.now().toISO()} /></p>
      <TurnButton canTurn={canTurn} />
    </main>
  );
}
