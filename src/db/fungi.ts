import { Rarity } from '@/lib/rarity';

export type FungusType = 'Mushroom' | 'Morel' | 'Truffle' | 'Toadstool' | 'Slime Mold' | 'Jelly' | 'Lichen';
export const Types: Array<FungusType> = ['Mushroom', 'Morel', 'Truffle', 'Toadstool', 'Slime Mold', 'Jelly', 'Lichen'];

export type Fungus = {
    id: number;
    name: string;
    rarity: Rarity;
    type: FungusType;
};

export type FungusDB = {
    [F in FungusType]: Fungus[];
};

const Mushrooms: Array<Fungus> = [
    { id: 1, name: 'Red with White Spots', rarity: 'Common', type: 'Mushroom' as FungusType },
    { id: 2, name: 'Yellow with White Spots', rarity: 'Uncommon', type: 'Mushroom' as FungusType },
    { id: 3, name: 'White with Blue Spots', rarity: 'Rare', type: 'Mushroom' as FungusType },
];

const Morels: Array<Fungus> = [
    { id: 4, name: 'Honeycomb', rarity: 'Common', type: 'Morel' as FungusType },
    { id: 5, name: 'Brain', rarity: 'Uncommon', type: 'Morel' as FungusType },
    { id: 6, name: 'Geometric', rarity: 'Rare', type: 'Morel' as FungusType },
];

const Truffles: Array<Fungus> = [
    { id: 7, name: 'Black', rarity: 'Common', type: 'Truffle' as FungusType },
    { id: 8, name: 'White', rarity: 'Uncommon', type: 'Truffle' as FungusType },
    { id: 9, name: 'Burgundy', rarity: 'Rare', type: 'Truffle' as FungusType },
];

const Toadstools: Array<Fungus> = [
    { id: 10, name: 'Deathcap', rarity: 'Common', type: 'Toadstool' as FungusType },
    { id: 11, name: "Gnome's Ottoman", rarity: 'Uncommon', type: 'Toadstool' as FungusType },
    { id: 12, name: 'Pixie Hat', rarity: 'Rare', type: 'Toadstool' as FungusType },
];

const SlimeMolds: Array<Fungus> = [
    { id: 13, name: 'Yellow', rarity: 'Common', type: 'Slime Mold' as FungusType },
    { id: 14, name: 'Dog Vomit', rarity: 'Uncommon', type: 'Slime Mold' as FungusType },
    { id: 15, name: 'Creeping', rarity: 'Rare', type: 'Slime Mold' as FungusType },
];

const Jellies: Array<Fungus> = [
    { id: 16, name: 'Marmalade', rarity: 'Common', type: 'Jelly' as FungusType },
    { id: 17, name: 'Strawberry', rarity: 'Uncommon', type: 'Jelly' as FungusType },
    { id: 18, name: 'Preserve', rarity: 'Rare', type: 'Jelly' as FungusType },
];

const Lichens: Array<Fungus> = [
    { id: 19, name: 'Crust', rarity: 'Common', type: 'Lichen' as FungusType },
    { id: 20, name: 'Shrub', rarity: 'Uncommon', type: 'Lichen' as FungusType },
    { id: 21, name: 'Gelatinous', rarity: 'Rare', type: 'Lichen' as FungusType },
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

export default F;