import { mapRarity } from './rarity';
import CardSet from './card-set';

class Card {
  constructor(
    set = CardSet.GENETIC_APEX,
    setNumber = 1,
    rarity,
    cardName,
    count = 1
  ) {
    this.set = set;
    this.setNumber = setNumber;
    this.rarity = mapRarity(rarity);
    this.cardName = cardName;
    this.count = count;
  }
}

export default Card;
