import { v4 as uuidv4 } from "uuid";

const titles = [
  "the Brave",
  "the Wise",
  "the Mighty",
  "the Valiant",
  "the Pure",
  "the Just",
  "the Bold",
  "the Strong",
  "the Courageous",
  "the Noble",
];

const firstNames = [
  "Aethelred",
  "Beowulf",
  "Caelan",
  "Dunstan",
  "Eadric",
  "Finnian",
  "Gareth",
  "Hrothgar",
  "Leofric",
  "Maeldred",
  "Osric",
  "Peregrin",
  "Rhydderch",
  "Sigebert",
  "Theodoric",
  "Ulric",
  "Vortigern",
  "Wulfstan",
  "Yorath",
  "Zephyrus",
];

const lastNames = [
  "Ashdown",
  "Blackwood",
  "Clearwater",
  "Dragon-Slayer",
  "Earth-Shaker",
  "Fire-Bringer",
  "Gold-Hand",
  "High-Tower",
  "Iron-Fist",
  "Light-Foot",
  "Moon-Shadow",
  "Night-Walker",
  "Oak-Heart",
  "Quick-Sword",
  "River-Wind",
  "Stone-Helm",
  "True-Arrow",
  "Void-Gazer",
  "White-Wolf",
  "Young-Blood",
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomUser() {
  const hasTitle = Math.random() > 0.5;
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const title = hasTitle ? ` ${getRandomElement(titles)}` : "";

  return {
    userId: uuidv4(),
    username: `${firstName} ${lastName}${title}`,
  };
}
