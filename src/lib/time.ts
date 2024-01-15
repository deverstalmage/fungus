import { DateTime, Duration, DurationLike } from 'luxon';

const units: Intl.RelativeTimeFormatUnit[] = [
  // 'year',
  // 'month',
  // 'week',
  // 'day',
  'hour',
  'minute',
  'second',
];

export function timeUntil(time: DateTime, offset?: DurationLike): string {
  const newTime: DateTime = offset ? time.plus(offset) : time;
  const diff = newTime.diffNow().shiftTo(...units);
  const format = Duration.fromObject({ hours: diff.hours, minutes: diff.minutes, seconds: diff.seconds });

  if (diff.toMillis() <= 0) return 'now';
  const hours = diff.hours ? `${diff.hours} hours, ` : ``;
  const minutes = diff.minutes ? `${diff.minutes} minutes, ` : ``;
  const seconds = ` ${Math.ceil(diff.seconds)} seconds`;
  return `in ${hours}${minutes}${seconds}`;
}

export function hasPassed(date: DateTime) {
  return date <= DateTime.now();
}