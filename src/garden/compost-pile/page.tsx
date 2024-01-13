import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { useLocalStorage } from '@/useLocalStorage';

function timeSince(date: Date) {

  var seconds = Math.floor(((new Date()).getTime() - date.getTime()) / 1000);

  var interval = seconds / 31536000;

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

  const [lastTurned, setLastTurned] = useLocalStorage('compost-last-turned', Date.now());

  return (
    <main className={styles.main}>
      <h1>Compost Pile</h1>
      <h2>It doesn't smell that great here...</h2>
      <p>Compost was last turned {timeSince(new Date(lastTurned))} ago</p>
      <button >Turn those leaves</button>
      <Link href="garden">Back to the garden</Link>
    </main>
  )
}
