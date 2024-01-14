import Link from "next/link";

export default function Garden() {
  return (
    <main>
      <h1>The Garden</h1>
      <h2>Select a plot:</h2>
      <ol>
        <li>Plot 1</li>
        <li>Plot 2</li>
        <li>Plot 3</li>
      </ol>
      <p><Link href="/garden/compost-pile">Check out the compost pile</Link></p>
      <p><Link href="/">Return home</Link></p>
    </main>
  );
}