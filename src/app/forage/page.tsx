import { getInventory } from "@/lib/inventory";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import Link from "next/link";
import ItemSelector from "../item-selector";

export default async function Forage() {
  const items = await getInventory();

  return (
    <main>
      <h1>Prepare to go foraging</h1>
      <h2>Select items to use on the expedition</h2>
      <ItemSelector items={items} />
      <Link href="/">Return home</Link>
    </main>
  );
}