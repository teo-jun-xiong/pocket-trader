import { test, expect } from 'playwright/test';
import { extractTradableCardsForCollections } from '../../services/card-service.js';
import Collection from '../../services/dto/collection.js';
import CardSet from '../../services/dto/card-set.js';

test.describe('Card Service', () => {
  test('extractTradableCardsForCollections: minimumCount 0', () => {
    const userCollection = new Collection('Alice');
    userCollection.addCard([CardSet.GENETIC_APEX], 1);
    userCollection.addCard([CardSet.GENETIC_APEX], 2);
    userCollection.addCard([CardSet.GENETIC_APEX], 2);

    // allCollections[0] has cards in 2 sets that are tradable
    const collectionOne = new Collection('Bob');
    collectionOne.addCard([CardSet.GENETIC_APEX], 3);
    collectionOne.addCard([CardSet.GENETIC_APEX], 3);
    collectionOne.addCard([CardSet.GENETIC_APEX], 3);
    collectionOne.addCard([CardSet.GENETIC_APEX], 4);
    collectionOne.addCard([CardSet.GENETIC_APEX], 4);
    collectionOne.addCard([CardSet.GENETIC_APEX], 4);
    collectionOne.addCard([CardSet.GENETIC_APEX], 4);

    // allCollections[1] has cards in 1 set that are tradable, but not in userCollection
    const collectionTwo = new Collection('Chad');
    collectionTwo.addCard([CardSet.SHINING_REVELRY], 1);

    const allCollections = [collectionOne, collectionTwo];
    const result = extractTradableCardsForCollections(
      userCollection,
      allCollections,
      0
    );

    expect(result).toHaveLength(2);
    expect(result[0].getUsername()).toBe('Bob');
    expect(result[0].getCardsForSet(CardSet.GENETIC_APEX)['3'].count).toEqual(
      3
    );
    expect(result[0].getCardsForSet(CardSet.GENETIC_APEX)['4'].count).toEqual(
      4
    );
    expect(result[1].getUsername()).toBe('Chad');
    expect(
      result[1].getCardsForSet(CardSet.SHINING_REVELRY)['1'].count
    ).toEqual(1);
  });

  test('extractTradableCardsForCollections: minimumCount 1 - should exclude collections with insufficient quantities', () => {
    const userCollection = new Collection('Alice');

    const collection = new Collection('Bob');
    collection.addCard([CardSet.GENETIC_APEX], 1);
    collection.addCard([CardSet.MYTHICAL_ISLAND], 2);
    collection.addCard([CardSet.MYTHICAL_ISLAND], 2);

    const result = extractTradableCardsForCollections(
      userCollection,
      [collection],
      1
    );

    expect(result).toHaveLength(1);
    expect(result[0].getUsername()).toBe('Bob');
    expect(
      result[0].getCardsForSet(CardSet.MYTHICAL_ISLAND)['1'].count
    ).toEqual(0);
    expect(
      result[0].getCardsForSet(CardSet.MYTHICAL_ISLAND)['2'].count
    ).toEqual(2);
  });
});
