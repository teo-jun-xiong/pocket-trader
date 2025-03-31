import { test, expect } from 'playwright/test';
import { extractTradableCardsForCollections } from '../../services/card-service.js';
import Collection from '../../services/dto/collection.js';
import CardSet from '../../services/dto/card-set.js';

test.describe('Card Service', () => {
  test('extractTradableCardsForCollections: minimumCount 0', () => {
    const userCollection = new Collection('Alice');
    userCollection.setCards({
      [CardSet.GENETIC_APEX]: {
        1: { count: 1 },
      },
      [CardSet.MYTHICAL_ISLAND]: {
        2: { count: 2 },
      },
    });

    // allCollections[0] has cards in 2 sets that are tradable
    const collectionOne = new Collection('Bob');
    collectionOne.setCards({
      [CardSet.GENETIC_APEX]: {
        3: { count: 3 },
      },
      [CardSet.MYTHICAL_ISLAND]: {
        4: { count: 4 },
      },
    });

    // allCollections[1] has cards in 1 set that are tradable, but not in userCollection
    const collectionTwo = new Collection('Chad');
    collectionTwo.setCards({
      [CardSet.SHINING_REVELRY]: {
        1: { count: 1 },
      },
    });

    const allCollections = [collectionOne, collectionTwo];
    const result = extractTradableCardsForCollections(
      userCollection,
      allCollections,
      0
    );

    expect(result).toHaveLength(2);
    expect(result[0].getUsername()).toBe('Bob');
    expect(result[0].getCards()).toEqual({
      [CardSet.GENETIC_APEX]: {
        3: { count: 3 },
      },
      [CardSet.MYTHICAL_ISLAND]: {
        4: { count: 4 },
      },
      [CardSet.SHINING_REVELRY]: {},
      [CardSet.SPACE_TIME_SMACKDOWN]: {},
      [CardSet.TRIUMPHANT_LIGHT]: {},
    });
    expect(result[1].getUsername()).toBe('Chad');
    expect(result[1].getCards()).toEqual({
      [CardSet.SHINING_REVELRY]: {
        1: { count: 1 },
      },
      [CardSet.GENETIC_APEX]: {},
      [CardSet.MYTHICAL_ISLAND]: {},
      [CardSet.SPACE_TIME_SMACKDOWN]: {},
      [CardSet.TRIUMPHANT_LIGHT]: {},
    });
  });

  test('extractTradableCardsForCollections: minimumCount 1 - should exclude collections with insufficient quantities', () => {
    const userCollection = new Collection('Alice');

    const collection = new Collection('Bob');
    collection.setCards({
      [CardSet.GENETIC_APEX]: {
        1: { count: 1 },
      },
      [CardSet.MYTHICAL_ISLAND]: {
        2: { count: 2 },
      },
    });

    const result = extractTradableCardsForCollections(
      userCollection,
      [collection],
      1
    );

    expect(result).toHaveLength(1);
    expect(result[0].getUsername()).toBe('Bob');
    expect(result[0].getCards()).toEqual({
      [CardSet.GENETIC_APEX]: {},
      [CardSet.MYTHICAL_ISLAND]: {
        2: { count: 2 },
      },
      [CardSet.SHINING_REVELRY]: {},
      [CardSet.SPACE_TIME_SMACKDOWN]: {},
      [CardSet.TRIUMPHANT_LIGHT]: {},
    });
  });
});
