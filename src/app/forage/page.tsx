import { getInventory } from "@/lib/inventory";
import Backpack from "./backpack";
import getCurrentUser from "@/lib/user";

export default async function Forage() {
  const user = await getCurrentUser();
  if (!user) return;
  const items = (await getInventory(user)).filter(i => i.type === 'Foraging Supplies');
  const canForage = user.energy >= 10;

  return (
    <main>
      <h1>Prepare to go foraging</h1>
      <Backpack items={items} canForage={canForage} />
    </main>
  );
}