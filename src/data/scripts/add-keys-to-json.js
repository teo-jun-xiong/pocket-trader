import fs from 'fs';
import path from 'path';

// Define the directory containing JSON files
const jsonDir = path.resolve('src/data/json');

// Read all files in the directory
fs.readdir(jsonDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err.message);
    return;
  }

  // Filter for JSON files only
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  // Iterate through each JSON file
  jsonFiles.forEach((file) => {
    const filePath = path.join(jsonDir, file);

    // Read and parse the JSON file
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err.message);
        return;
      }

      try {
        const jsonData = JSON.parse(data);

        // Perform operations on the JSON data
        console.log(`Processing file: ${file}`);

        const transformedData = {};
        jsonData.forEach((card) => {
          transformedData[card['setNumber']] = card;
        });

        // Write the updated JSON back to the file
        fs.writeFile(
          filePath,
          JSON.stringify(transformedData, null, 2),
          'utf-8',
          (err) => {
            if (err) {
              console.error(`Error writing file ${file}:`, err.message);
            } else {
              console.log(`Updated file: ${file}`);
            }
          }
        );
      } catch (parseErr) {
        console.error(`Error parsing JSON in file ${file}:`, parseErr.message);
      }
    });
  });
});
