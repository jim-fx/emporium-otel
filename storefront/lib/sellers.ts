export interface Seller {
  id: string;
  name: string;
  url: string;
  technology: string;
  productType: string;
  description: string;
  character: string;
  color: string;
}

export const sellers: Seller[] = [
  {
    id: "bartholomew",
    productType: "potion",
    url: "http://potion-seller",
    technology: "Golang with Gin and pgx",
    name: "Bartholomew’s Go-Tonic Lab",
    description:
      "A master alchemist whose concoctions are brewed with the swiftness of a mountain stream and the unyielding strength of ancient stone, ensuring potent and reliable effects.",
    character: "gopher_dark_transparent.webp",
    color: "brightness-110",
  },
  {
    id: "elara",
    productType: "charm",
    url: "http://charm-seller",
    technology: "PHP with symfony and doctrine",
    name: "Elara’s Bundle of Charms",
    description: "A venerable enchantress whose charms are woven from intricate patterns and ancient lore, ensuring robust and time-honored protections.",
    character: "elephant_dark_transparent.webp",
    color: "brightness-110 hue-rotate-180",
  },
  {
    id: "grimjaw",
    productType: "weapon",
    technology: "Deno with Hono and drizzle-orm",
    url: "http://weapon-seller",
    name: "Grimjaw’s Dino-Forge Arsenal",
    description: "A formidable smith whose armaments are forged with untamed power and pristine clarity, crafted for the boldest adventurers seeking cutting-edge might.",
    character: "denosaur_dark_transparent.webp",
    color: "grayscale brightness-150",
  },
];
