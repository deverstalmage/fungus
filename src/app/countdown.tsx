'use client';
import { DateTime } from 'luxon';
import { useState } from 'react';
import useInterval from '@/hooks/use-interval';
import { timeUntil, msUntil } from '@/lib/time';


export default function Countdown({ date = DateTime.now().toISO(), tick = () => { } }: { date: string; tick?: (n: number) => void; }) {
  const [dateDisplay, setCount] = useState(timeUntil(DateTime.fromISO(date)));
  const dt = DateTime.fromISO(date);

  useInterval(() => {
    setCount(timeUntil(dt));
    tick(msUntil(dt));
  }, 1000);

  return <span suppressHydrationWarning>{dateDisplay}</span>;
};