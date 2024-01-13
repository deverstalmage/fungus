import { Rarity } from "@/lib/rarity";

export type Item = {
  id: number;
  name: string;
  rarity: Rarity;
  consumable?: boolean;
  equipment?: boolean;
};

export const ItemLibrary = [
  { id: 1, name: 'Compost', rarity: 'Common' },
  { id: 2, name: 'Slug', rarity: 'Uncommon' },
];