import { getInventory } from "@/lib/inventory";
import Link from "next/link";
import CardSelector from "../card-selector";
import ForageButton from '@/app/forage/forage-button';
import { Item } from "@/db/items";
import Backpack from "./backpack";

export default async function Forage() {
  const items = (await getInventory()).filter(i => i.type === 'Foraging Supplies');


  return (
    <main>
      <h1>Prepare to go foraging</h1>
      <h2>Select items to use on the expedition</h2>

      <Backpack items={items} />

      <p><Link href="/">Return home</Link></p>
    </main>
  );
}