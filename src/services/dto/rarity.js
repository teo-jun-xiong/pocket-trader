const Rarity = Object.freeze({
  DIAMOND_1: '1d',
  DIAMOND_2: '2d',
  DIAMOND_3: '3d',
  DIAMOND_4: '4d',
  STAR_1: '1s',
  STAR_2: '2s',
  STAR_3: '3s',
  CROWN: '1c',
});

export function mapRarity(rarityKey) {
  const rarityMap = {
    diamond1: Rarity.DIAMOND_1,
    diamond2: Rarity.DIAMOND_2,
    diamond3: Rarity.DIAMOND_3,
    diamond4: Rarity.DIAMOND_4,
    star1: Rarity.STAR_1,
    star2: Rarity.STAR_2,
    star3: Rarity.STAR_3,
    crown: Rarity.CROWN,
  };

  return rarityMap[rarityKey] || Rarity.DIAMOND_1; // Default to '1d' if not found
}

export default Rarity;
