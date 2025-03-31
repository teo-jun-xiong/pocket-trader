import CardSet from './card-set.js';

class Collection {
  #cards = initialize();
  #username = undefined;

  constructor(username) {
    this.#username = username;
  }

  getCards() {
    return this.#cards;
  }

  getCardsForSet(setName) {
    return this.#cards[setName];
  }

  setCards(cards) {
    this.#cards = cards;
  }

  setCardsForSet(setName, cards) {
    this.#cards[setName] = cards;
  }

  addCard(setName, card) {
    this.#cards[setName][card['setNumber']] = card;
  }

  getUsername() {
    return this.#username;
  }
}

function initialize() {
  const map = {};

  // Iterate over each item in CardSet and create an empty list for each
  Object.values(CardSet).forEach((setName) => {
    map[setName] = {};
  });

  return map;
}

export default Collection;
