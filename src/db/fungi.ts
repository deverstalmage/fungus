import { Rarity } from '@/lib/rarity';

export type FungusType = 'Mushroom' | 'Morel' | 'Truffle' | 'Toadstool' | 'Slime Mold' | 'Jelly' | 'Lichen';
export const Types: Array<FungusType> = ['Mushroom', 'Morel', 'Truffle', 'Toadstool', 'Slime Mold', 'Jelly', 'Lichen'];

export type StaticFungus = {
    id: number;
    name: string;
    rarity: Rarity;
    type: FungusType;
    yield: number;
    msToHarvest: number;
    msToEstablish: number;
};

export type DbFungus = {
    id: number;
    spaceIndex: number | null;
    lastHarvested: number | bigint;
    fungusId: number;
    growthMediumItemId?: number | null;
};

export type CombinedFungus = StaticFungus & DbFungus & { uid: number; };

export type Fungus = StaticFungus | DbFungus & {
    name: string;
    rarity: Rarity;
    type: FungusType;
} | CombinedFungus;

export type FungusDB = {
    [F in FungusType]: Fungus[];
};

export function isFungus(obj: any): obj is Fungus {
    return obj.type && Types.includes(obj.type);
}

const Mushrooms: Array<StaticFungus> = [
    { id: 1, name: 'Red with White Spots', rarity: 'Common', type: 'Mushroom' as FungusType, yield: 100, msToHarvest: 1000 * 60 * 1, msToEstablish: 1000 * 60 * 10 },
    { id: 2, name: 'Yellow with White Spots', rarity: 'Uncommon', type: 'Mushroom' as FungusType, yield: 500, msToHarvest: 1000 * 60 * 5, msToEstablish: 1000 * 60 * 50 },
    { id: 3, name: 'White with Blue Spots', rarity: 'Rare', type: 'Mushroom' as FungusType, yield: 2500, msToHarvest: 1000 * 60 * 25, msToEstablish: 1000 * 60 * 250 },
];

const Morels: Array<StaticFungus> = [
    { id: 4, name: 'Honeycomb', rarity: 'Common', type: 'Morel' as FungusType, yield: 100, msToHarvest: 1000 * 60 * 1, msToEstablish: 1000 * 60 * 10 },
    { id: 5, name: 'Brain', rarity: 'Uncommon', type: 'Morel' as FungusType, yield: 500, msToHarvest: 1000 * 60 * 5, msToEstablish: 1000 * 60 * 50 },
    { id: 6, name: 'Geometric', rarity: 'Rare', type: 'Morel' as FungusType, yield: 2500, msToHarvest: 1000 * 60 * 25, msToEstablish: 1000 * 60 * 250 },
];

const Truffles: Array<StaticFungus> = [
    { id: 7, name: 'Black', rarity: 'Common', type: 'Truffle' as FungusType, yield: 100, msToHarvest: 1000 * 60 * 1, msToEstablish: 1000 * 60 * 10 },
    { id: 8, name: 'White', rarity: 'Uncommon', type: 'Truffle' as FungusType, yield: 500, msToHarvest: 1000 * 60 * 5, msToEstablish: 1000 * 60 * 50 },
    { id: 9, name: 'Burgundy', rarity: 'Rare', type: 'Truffle' as FungusType, yield: 2500, msToHarvest: 1000 * 60 * 25, msToEstablish: 1000 * 60 * 250 },
];

const Toadstools: Array<StaticFungus> = [
    { id: 10, name: 'Deathcap', rarity: 'Common', type: 'Toadstool' as FungusType, yield: 100, msToHarvest: 1000 * 60 * 1, msToEstablish: 1000 * 60 * 10 },
    { id: 11, name: "Gnome's Ottoman", rarity: 'Uncommon', type: 'Toadstool' as FungusType, yield: 500, msToHarvest: 1000 * 60 * 5, msToEstablish: 1000 * 60 * 50 },
    { id: 12, name: 'Pixie Hat', rarity: 'Rare', type: 'Toadstool' as FungusType, yield: 2500, msToHarvest: 1000 * 60 * 25, msToEstablish: 1000 * 60 * 250 },
];

const SlimeMolds: Array<StaticFungus> = [
    { id: 13, name: 'Yellow', rarity: 'Common', type: 'Slime Mold' as FungusType, yield: 100, msToHarvest: 1000 * 60 * 1, msToEstablish: 1000 * 60 * 10 },
    { id: 14, name: 'Dog Vomit', rarity: 'Uncommon', type: 'Slime Mold' as FungusType, yield: 500, msToHarvest: 1000 * 60 * 5, msToEstablish: 1000 * 60 * 50 },
    { id: 15, name: 'Creeping', rarity: 'Rare', type: 'Slime Mold' as FungusType, yield: 2500, msToHarvest: 1000 * 60 * 25, msToEstablish: 1000 * 60 * 250 },
];

const Jellies: Array<StaticFungus> = [
    { id: 16, name: 'Marmalade', rarity: 'Common', type: 'Jelly' as FungusType, yield: 100, msToHarvest: 1000 * 60 * 1, msToEstablish: 1000 * 60 * 10 },
    { id: 17, name: 'Strawberry', rarity: 'Uncommon', type: 'Jelly' as FungusType, yield: 500, msToHarvest: 1000 * 60 * 5, msToEstablish: 1000 * 60 * 50 },
    { id: 18, name: 'Preserve', rarity: 'Rare', type: 'Jelly' as FungusType, yield: 2500, msToHarvest: 1000 * 60 * 25, msToEstablish: 1000 * 60 * 250 },
];

const Lichens: Array<StaticFungus> = [
    { id: 19, name: 'Crust', rarity: 'Common', type: 'Lichen' as FungusType, yield: 100, msToHarvest: 1000 * 60 * 1, msToEstablish: 1000 * 60 * 10 },
    { id: 20, name: 'Shrub', rarity: 'Uncommon', type: 'Lichen' as FungusType, yield: 500, msToHarvest: 1000 * 60 * 5, msToEstablish: 1000 * 60 * 50 },
    { id: 21, name: 'Gelatinous', rarity: 'Rare', type: 'Lichen' as FungusType, yield: 2500, msToHarvest: 1000 * 60 * 25, msToEstablish: 1000 * 60 * 250 },
];

const F: FungusDB = {
    Mushroom: Mushrooms,
    Morel: Morels,
    Truffle: Truffles,
    Toadstool: Toadstools,
    'Slime Mold': SlimeMolds,
    Jelly: Jellies,
    Lichen: Lichens,
};

const FungusLibrary = [
    ...Mushrooms,
    ...Morels,
    ...Truffles,
    ...Toadstools,
    ...SlimeMolds,
    ...Jellies,
    ...Lichens,
];

export function getFungus(id: number): StaticFungus {
    return FungusLibrary.filter(i => i.id === id)[0];
}

export default F;