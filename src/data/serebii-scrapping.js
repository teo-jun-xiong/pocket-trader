import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import axios from "axios";

async function extractSetData(setName) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const urlSetName = setName.toLowerCase().replace(/ /g, "");

  await page.goto(`https://www.serebii.net/tcgpocket/${urlSetName}/`);

  const locator = page.locator("tr");
  const rows = await locator.evaluateAll((rows, setName) => {
    const urlSetName = setName.toLowerCase().replace(/ /g, "");

    function extractSetNumber(cell) {
      return cell.textContent
        .replace(new RegExp(setName, "i"), "")
        .replace(/[^0-9].*/, "")
        .trim();
    }

    function extractRarity(cell) {
      const map = {
        diamond1: "1d",
        diamond2: "2d",
        diamond3: "3d",
        diamond4: "4d",
        star1: "1s",
        star2: "2s",
        star3: "3s",
        crown: "1c",
      };

      const match = cell
        .querySelectorAll("td img")[0]
        .src.match(/\/([^\/]+)\.png/);
      return match ? map[match[1]] : "1d";
    }

    function extractName(cell) {
      return cell.textContent.trim();
    }

    function getImageUrl(setName, setNumber) {
      return `https://www.serebii.net/tcgpocket/${setName}/${setNumber}.jpg`;
    }

    return rows
      .filter(
        (row) =>
          row.innerText.includes(setName) && row.innerText.includes("Weakness")
      )
      .map((row) => {
        const cells = row.querySelectorAll("td");
        const setNumber = extractSetNumber(cells[0]);
        const rarity = extractRarity(cells[0]);
        const cardName = extractName(cells[2]);
        const imageUrl = getImageUrl(urlSetName, setNumber);

        return {
          setNumber: setNumber,
          rarity: rarity,
          cardName: cardName,
          imageUrl: imageUrl,
        };
      });
  }, setName);

  await browser.close();

  const imgDir = path.resolve(`src/data/img/${urlSetName}`);
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  async function downloadImage(url, filename) {
    const filePath = path.join(imgDir, filename);
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }

  for (const row of rows) {
    const { imageUrl, setNumber } = row;
    const filename = `${setNumber}.jpg`;
    const filePath = path.join(imgDir, filename);

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      console.log(`${filename} already exists. Skipping download.`);
      continue; // Skip to the next iteration
    }

    try {
      console.log(`Downloading ${filename}...`);
      await downloadImage(imageUrl, filename);
      console.log(`${filename} downloaded successfully.`);
    } catch (error) {
      console.error(`Failed to download ${filename}:`, error.message);
    }
  }

  const filteredRows = rows.map(({ imageUrl, ...rest }) => rest);
  const outputFilePath = path.resolve(`src/data/${urlSetName}.json`);
  fs.writeFileSync(
    outputFilePath,
    JSON.stringify(filteredRows, null, 2),
    "utf-8"
  );
  console.log(`Rows data written to ${outputFilePath}`);
}

const sets = [
  "Genetic Apex",
  "Mythical Island",
  "Space-time Smackdown",
  "Triumphant Light",
  "Shining Revelry",
];

for (const set of sets) {
  await extractSetData(set);
}
