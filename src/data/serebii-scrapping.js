import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true }); // Set to false for debugging
const page = await browser.newPage();

await page.goto("https://www.serebii.net/tcgpocket/geneticapex/");

const locator = page.locator("tr");
const rows = await locator.evaluateAll((rows) => {
  function extractSetNumber(cell) {
    return cell.textContent
      .replace(/Genetic Apex/, "")
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

  function getImageUrl(setNumber) {
    return `https://www.serebii.net/tcgpocket/geneticapex/${setNumber}.jpg`;
  }

  return rows
    .filter(
      (row) =>
        row.innerText.includes("Genetic Apex") &&
        row.innerText.includes("Weakness")
    )
    .map((row) => {
      const cells = row.querySelectorAll("td");
      const setNumber = extractSetNumber(cells[0]);
      const rarity = extractRarity(cells[0]);
      const cardName = extractName(cells[2]);
      const imageUrl = getImageUrl(setNumber);

      return {
        setNumber: setNumber,
        rarity: rarity,
        cardName: cardName,
        imageUrl: imageUrl,
      };
    });
});

console.log(rows);

await browser.close();
