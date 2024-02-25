import { getInventory } from "@/lib/inventory";
import Link from "next/link";
import Backpack from "./backpack";

export default async function Forage() {
  const items = (await getInventory()).filter(i => i.type === 'Foraging Supplies');


  return (
    <main>
      <h1>Prepare to go foraging</h1>
      <Backpack items={items} />
      <p><Link href="/">Return home</Link></p>
    </main>
  );
}