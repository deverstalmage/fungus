'use client';
import { DateTime } from 'luxon';
import { useState } from 'react';
import useInterval from '@/hooks/use-interval';
import { timeUntil } from '@/lib/time';


export default function Countdown({ date = DateTime.now().toISO() }: { date: string; }) {
  const [dateDisplay, setCount] = useState(timeUntil(DateTime.fromISO(date)));

  useInterval(() => {
    setCount(timeUntil(DateTime.fromISO(date)));
  }, 1000);

  return <span suppressHydrationWarning>{dateDisplay}</span>;
};