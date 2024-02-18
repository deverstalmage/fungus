import { getInventory } from "@/lib/inventory";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import Link from "next/link";
import CardSelector from "../card-selector";
import ForageButton from '@/app/forage/forage-button';

export default async function Forage() {
  const items = await getInventory();

  return (
    <main>
      <h1>Prepare to go foraging</h1>
      <h2>Select items to use on the expedition</h2>
      <CardSelector items={items} />


      <div><ForageButton /></div>


      <p><Link href="/">Return home</Link></p>
    </main>
  );
}