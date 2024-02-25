'use client';

import { Item } from "@/db/items";
import CardSelector from "../card-selector";
import ForageButton from "./forage-button";

export default function Backpack({ items }: { items: Array<Item>; }) {
  return (
    <>
      <CardSelector items={items} onSelect={() => { }} />


      <div><ForageButton /></div>
    </>
  );
}