import { Rarity } from '@/lib/rarity';

export type FungusType = 'Mushroom' | 'Morel' | 'Truffle' | 'Toadstool' | 'Slime Mold' | 'Jelly' | 'Lichen';
export const Types: Array<FungusType> = ['Mushroom', 'Morel', 'Truffle', 'Toadstool', 'Slime Mold', 'Jelly', 'Lichen'];

export type Fungus = {
    name: string;
    rarity: Rarity;
    type: FungusType;
}

export type FungusDB = {
    [F in FungusType]: Fungus[];
}

const Mushrooms: Array<Fungus> = [
    { name: 'Red with White Spots', rarity: 'Common', type: 'Mushroom' as FungusType },
    { name: 'Yellow with White Spots', rarity: 'Uncommon', type: 'Mushroom' as FungusType },
    { name: 'White with Blue Spots', rarity: 'Rare', type: 'Mushroom' as FungusType },
];

const Morels: Array<Fungus> = [
    { name: 'Honeycomb', rarity: 'Common', type: 'Morel' as FungusType },
    { name: 'Brain', rarity: 'Uncommon', type: 'Morel' as FungusType },
    { name: 'Geometric', rarity: 'Rare', type: 'Morel' as FungusType },
];

const Truffles: Array<Fungus> = [
    { name: 'Black', rarity: 'Common', type: 'Truffle' as FungusType },
    { name: 'White', rarity: 'Uncommon', type: 'Truffle' as FungusType },
    { name: 'Burgundy', rarity: 'Rare', type: 'Truffle' as FungusType },
];

const Toadstools: Array<Fungus> =[ 
    { name: 'Deathcap', rarity: 'Common', type: 'Toadstool' as FungusType },
    { name: "Gnome's Ottoman", rarity: 'Uncommon', type: 'Toadstool' as FungusType },
    { name: 'Pixie Hat', rarity: 'Rare',  type: 'Toadstool' as FungusType },
];

const SlimeMolds: Array<Fungus> = [
    { name: 'Yellow', rarity: 'Common',  type: 'Slime Mold' as FungusType },
    { name: 'Dog Vomit', rarity: 'Uncommon',  type: 'Slime Mold' as FungusType },
    { name: 'Creeping', rarity: 'Rare',  type: 'Slime Mold' as FungusType },
];

const Jellies: Array<Fungus> = [
    { name: 'Marmalade', rarity: 'Common',  type: 'Jelly' as FungusType },
    { name: 'Strawberry', rarity: 'Uncommon',  type: 'Jelly' as FungusType },
    { name: 'Preserve', rarity: 'Rare',  type: 'Jelly' as FungusType },
];

const Lichens: Array<Fungus> = [
    { name: 'Crust', rarity: 'Common',  type: 'Lichen' as FungusType },
    { name: 'Shrub', rarity: 'Uncommon',  type: 'Lichen' as FungusType },
    { name: 'Gelatinous', rarity: 'Rare',  type: 'Lichen' as FungusType },
];

const F: FungusDB = {
    Mushroom: Mushrooms,
    Morel: Morels,
    Truffle: Truffles,
    Toadstool: Toadstools,
    'Slime Mold': SlimeMolds,
    Jelly: Jellies,
    Lichen: Lichens,
}

export default F;