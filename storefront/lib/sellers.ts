export interface Seller {
  id: string;
  name: string;
  productType: string;
  description: string;
  character: string;
  color: string;
  emoji: string;
}

export const sellers: Seller[] = [
  {
    id: "gopher",
    productType: "potion",
    name: "Bartholomew's Potions",
    description:
      "Master alchemist specializing in healing and enhancement elixirs",
    character: "gopher_dark_transparent.webp",
    color: "brightness-110",
    emoji: "🔵",
  },
  {
    id: "elephant",
    productType: "charms",
    name: "Elara's Enchantments",
    description: "Purveyor of mystical amulets and protective charms",
    character: "elephant_dark_transparent.webp",
    color: "brightness-110 hue-rotate-180",
    emoji: "🔵",
  },
  {
    id: "dinosaur",
    productType: "weapons",
    name: "Grimjaw's Armory",
    description: "Ancient warrior offering legendary weapons and wands",
    character: "denosaur_dark_transparent.webp",
    color: "grayscale brightness-150",
    emoji: "🦴",
  },
];
