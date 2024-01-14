export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Ultra Rare' | 'Secret';
export type Grade = 'D' | 'C' | 'B' | 'A' | 'S' | 'Ω';

export type RarityMap = {
  [R in Rarity]: number;
};

export const rarityStars: { [R in Rarity]: string } = {
  'Common': `⭐️`,
  'Uncommon': `⭐️⭐️`,
  'Rare': `⭐️⭐️⭐️`,
  'Ultra Rare': `⭐️⭐️⭐️⭐️`,
  'Secret': `⭐️⭐️⭐️⭐️⭐️`,
};

export function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export const Rarities: RarityMap = {
  Common: 1,
  Uncommon: 0.25,
  Rare: 0.01,
  'Ultra Rare': 0.005,
  Secret: 0.001,
};

export function roll(rarities?: Array<Rarity>): Rarity {
  const r = Math.random();

  if (r <= Rarities.Secret && (!rarities || (rarities && rarities.includes('Secret')))) return 'Secret';
  if (r <= Rarities['Ultra Rare'] && (!rarities || (rarities && rarities.includes('Ultra Rare')))) return 'Ultra Rare';
  if (r <= Rarities.Rare && (!rarities || (rarities && rarities.includes('Rare')))) return 'Rare';
  if (r <= Rarities.Uncommon && (!rarities || (rarities && rarities.includes('Uncommon')))) return 'Uncommon';
  if (r <= Rarities.Common && (!rarities || (rarities && rarities.includes('Common')))) return 'Common';

  if (rarities && rarities.length) return rarities[0];
  return 'Common';
  // return r <= Rarities.Secret && rarities && rarities.includes('Secret') ? 'Secret' : r <= Rarities["Ultra Rare"] ? 'Ultra Rare' : r <= Rarities.Rare ? 'Rare' : r <= Rarities.Uncommon ? 'Uncommon' : 'Common';
}