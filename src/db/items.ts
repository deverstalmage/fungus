import { Rarity } from "@/lib/rarity";

type ItemType = 'Fertilizer' | 'Substrate' | 'Foraging Supplies';

export type Item = BaseItem | SubstrateItem | FertilizerItem;

export type BaseItem = {
  id: number;
  name: string;
  type: ItemType;
  rarity: Rarity;
};

export type SubstrateItem = {
  harvestYieldMultiplier: number;
  harvestTimeMultiplier: number;
} & BaseItem;

export type FertilizerItem = {
  harvestTimeReduction: number;
} & BaseItem;

export const ItemLibrary: Array<Item> = [

  { id: 1, name: 'Compost', type: 'Fertilizer', rarity: 'Common', harvestTimeReduction: 1000 * 60 * 1 },
  { id: 2, name: 'Slug', type: 'Fertilizer', rarity: 'Uncommon', harvestTimeReduction: 1000 * 60 * 5 },
  { id: 3, name: 'Pixie Dust', type: 'Fertilizer', rarity: 'Rare', harvestTimeReduction: 1000 * 60 * 15 },

  { id: 4, name: 'Spore Collection Kit', type: 'Foraging Supplies', rarity: 'Uncommon' },

  { id: 5, name: 'Oak Log', type: 'Substrate', rarity: 'Common', harvestYieldMultiplier: 1.2, harvestTimeMultiplier: 1.1 },
  { id: 6, name: 'Toilet Paper', type: 'Substrate', rarity: 'Common', harvestYieldMultiplier: 0.9, harvestTimeMultiplier: 0.8 },
  { id: 10, name: 'Shredded Cardboard', type: 'Substrate', rarity: 'Common', harvestYieldMultiplier: 1, harvestTimeMultiplier: 1 },


  { id: 7, name: 'Sabouraud Dextrose Agar', type: 'Substrate', rarity: 'Uncommon', harvestYieldMultiplier: 2, harvestTimeMultiplier: 1.5 },
  { id: 8, name: 'Tryptic Soy Broth', type: 'Substrate', rarity: 'Uncommon', harvestYieldMultiplier: 0.8, harvestTimeMultiplier: 0.6 },

  { id: 9, name: 'Decomposing Ent Thigh', type: 'Substrate', rarity: 'Rare', harvestYieldMultiplier: 3, harvestTimeMultiplier: 2 },

];

export function getItem(id: number): Item {
  return ItemLibrary.filter(i => i.id === id)[0];
}