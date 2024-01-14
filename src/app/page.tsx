import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      <h2>What would you like to do?</h2>
      <p><Link href="/garden">Go to the Garden</Link></p>
      <p><Link href="/forage">Go Foraging</Link></p>
      <p><Link href="/inventory">View your inventory</Link></p>
    </main>
  );
}
