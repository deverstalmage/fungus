import { getInventory } from "@/lib/inventory";
import Link from "next/link";
import Backpack from "./backpack";
import getCurrentUser from "@/lib/user";

export default async function Forage() {
  const items = (await getInventory()).filter(i => i.type === 'Foraging Supplies');
  const user = await getCurrentUser();
  if (!user) return;
  const canForage = user.energy >= 10;

  return (
    <main>
      <h1>Prepare to go foraging</h1>
      <Backpack items={items} canForage={canForage} />
      <p><Link href="/">Return home</Link></p>
    </main>
  );
}