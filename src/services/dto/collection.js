import { emptyCollection } from '../../data/empty-collection.js';

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

  addCard(setName, setNumber) {
    if (this.#cards[setName][setNumber]) {
      this.#cards[setName][setNumber].count++;
    }
  }

  removeCard(setName, setNumber) {
    if (this.#cards[setName][setNumber]) {
      this.#cards[setName][setNumber].count = Math.max(
        0,
        this.#cards[setName][setNumber].count - 1
      );
    }
  }

  getUsername() {
    return this.#username;
  }
}

function initialize() {
  return emptyCollection;
}

export default Collection;
