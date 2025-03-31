import CardSet from './dto/card-set.js';

export function extractTradableCardsForCollections(
  userCollection,
  allCollections,
  minimumCount = 0
) {
  const tradableCollections = [];

  allCollections.array.forEach((collection) => {
    tradableCollections.push(
      extractTradableCards(userCollection, collection, minimumCount)
    );
  });

  return tradableCollections;
}

export function extractTradableCards(userCollection, collection, minimumCount) {
  const tradableCards = {};

  Object.values(CardSet).forEach((setName) => {
    const userCards = userCollection.getCardsForSet(setName);
    const cards = collection.getCardsForSet(setName);
    const tradable = getDifference(userCards, cards, minimumCount);
    tradableCards[setName] = tradable;
  });

  return tradableCards;
}

function getDifference(userCards, cards, minimumCount) {
  const tradable = {};

  for (const [setNumber, card] of Object.entries(cards)) {
    const userCard = userCards[`${setNumber}`];
    if (!userCard && card['count'] > minimumCount) {
      tradable[setNumber] = card;
    }
  }

  return tradable;
}
