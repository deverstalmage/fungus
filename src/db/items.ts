import { Rarity } from "@/lib/rarity";

type ItemType = 'Fertilizer' | 'Growth Medium' | 'Foraging Supplies';

export type Item = {
  id: number;
  uid?: number;
  name: string;
  type: ItemType;
  rarity: Rarity;
  consumable?: boolean;
  equipment?: boolean;
};

export const ItemLibrary: Array<Item> = [
  { id: 1, name: 'Compost', type: 'Fertilizer', rarity: 'Common' },
  { id: 2, name: 'Slug', type: 'Fertilizer', rarity: 'Uncommon' },
  { id: 3, name: 'Pixie Dust', type: 'Fertilizer', rarity: 'Rare' },
  { id: 4, name: 'Spore Collection Kit', type: 'Foraging Supplies', rarity: 'Uncommon' },
  { id: 5, name: 'Oak Log', type: 'Growth Medium', rarity: 'Common' },
  { id: 6, name: 'Toilet Paper', type: 'Growth Medium', rarity: 'Common' },
];

export function getItem(id: number): Item {
  return ItemLibrary.filter(i => i.id === id)[0];
}