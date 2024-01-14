import { Rarity } from "@/lib/rarity";

export type Item = {
  id: number;
  name: string;
  rarity: Rarity;
  consumable?: boolean;
  equipment?: boolean;
};

export const ItemLibrary: Array<Item> = [
  { id: 1, name: 'Compost', rarity: 'Common' },
  { id: 2, name: 'Slug', rarity: 'Uncommon' },
  { id: 3, name: 'Pixie Dust', rarity: 'Rare' },
];

export function getItem(id: number): Item {
  return ItemLibrary.filter(i => i.id === id)[0];
}