import { DateTime, DurationLike, Duration } from 'luxon';

const units: Intl.RelativeTimeFormatUnit[] = [
  // 'year',
  // 'month',
  // 'week',
  // 'day',
  'hour',
  'minute',
  'second',
];

export function timeUntil(startTime: DateTime, dur: DurationLike): string {
  const newTime = startTime.plus(dur);
  const diff = newTime.diffNow().shiftTo(...units);
  if (diff.toMillis() <= 0) return 'now';
  return `in ${diff.toHuman()}`;
}

export function hasPassed(date: DateTime) {
  return date <= DateTime.now();
}