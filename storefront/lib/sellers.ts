export interface Seller {
  id: string;
  name: string;
  description: string;
  character: string;
  color: string;
  emoji: string;
}

export const sellers: Seller[] = [
  {
    id: "gopher",
    name: "Bartholomew's Potions",
    description:
      "Master alchemist specializing in healing and enhancement elixirs",
    character: "gopher_dark_transparent.png",
    color: "brightness-110",
    emoji: "🔵",
  },
  {
    id: "elephant",
    name: "Elara's Enchantments",
    description: "Purveyor of mystical amulets and protective charms",
    character: "elephant_dark_transparent.png",
    color: "brightness-110 hue-rotate-180",
    emoji: "🔵",
  },
  {
    id: "dinosaur",
    name: "Grimjaw's Armory",
    description: "Ancient warrior offering legendary weapons and wands",
    character: "denosaur_dark_transparent.png",
    color: "grayscale brightness-150",
    emoji: "🦴",
  },
];
