export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Ultra Rare' | 'Secret';
export type Grade = 'D' | 'C' | 'B' | 'A' | 'S' | 'Ω';

export type RarityMap = {
    [R in Rarity]: number;
}

export const Rarities: RarityMap = {
    Common: 1,
    Uncommon: 0.25,
    Rare: 0.01,
    'Ultra Rare': 0.005,
    Secret: 0.001,
}

export function roll(): Rarity {
  const r = Math.random();
  return r <= Rarities.Secret ? 'Secret' : r <= Rarities["Ultra Rare"] ? 'Ultra Rare' : r <= Rarities.Rare ? 'Rare' : r <= Rarities.Uncommon ? 'Uncommon' : 'Common';
}