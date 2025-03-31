import CardSet from './dto/card-set.js';
import Collection from './dto/collection.js';

export function extractTradableCardsForCollections(
  userCollection,
  allCollections,
  minimumCount = 0
) {
  const tradableCollections = [];

  allCollections.forEach((collection) => {
    tradableCollections.push(
      extractTradableCards(userCollection, collection, minimumCount)
    );
  });

  return tradableCollections;
}

function extractTradableCards(userCollection, collection, minimumCount) {
  const tradableCollection = new Collection(collection.getUsername());

  Object.values(CardSet).forEach((setName) => {
    const userCards = userCollection.getCardsForSet(setName);
    const cards = collection.getCardsForSet(setName);
    const tradable = getDifference(userCards, cards, minimumCount);
    tradableCollection.setCardsForSet(setName, tradable);
  });

  return tradableCollection;
}

function getDifference(userCards, cards, minimumCount) {
  const tradable = {};

  // if user does not have any cards in the set, all cards in the set are tradable
  if (!cards) {
    return tradable;
  }

  // if user does not have any cards, all cards in the set are tradable
  if (!userCards) {
    return cards;
  }

  for (const [setNumber, card] of Object.entries(cards)) {
    const userCard = userCards[setNumber];
    if (!userCard && card['count'] > minimumCount) {
      tradable[setNumber] = card;
    }
  }

  return tradable;
}
