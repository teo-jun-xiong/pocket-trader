import fs from 'fs';
import path from 'path';
import CardSet from '../../services/dto/card-set.js';
import { fileURLToPath } from 'url';

// Get the current directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeEmptyCollection() {
  const map = {};

  // Iterate over each item in CardSet and create an empty list for each
  Object.values(CardSet).forEach((setName) => {
    const filePath = getPathForCardSet(setName);
    map[setName] = Object.values(
      JSON.parse(fs.readFileSync(filePath, 'utf8'))
    ).map((card) => {
      return {
        ...card,
        count: 0,
      };
    });
  });

  // Write the resulting map to a JavaScript file
  const outputFilePath = path.resolve(
    __dirname,
    '../data/processed-collection.js'
  );
  const fileContent = `export const processedCollection = ${JSON.stringify(map, null, 2)};`;
  fs.writeFileSync(outputFilePath, fileContent, 'utf8');
  console.log(`Processed collection saved to ${outputFilePath}`);
}

function getPathForCardSet(cardSet) {
  const formattedSetName = cardSet.replace(/\s+/g, '').toLowerCase();
  return path.resolve(__dirname, `../data/json/${formattedSetName}.json`);
}
