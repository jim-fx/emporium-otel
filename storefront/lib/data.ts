export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  seller: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const products: Product[] = [
  // Gopher's Potions
  {
    id: 1,
    name: "Healing Elixir",
    price: 25,
    description: "Restores 50 health points instantly",
    image:
      "https://images.unsplash.com/photo-1610270066297-7b06341d2b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rpb24lMjBib3R0bGVzJTIwbWFnaWN8ZW58MXx8fHwxNzYzMzI5NTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "common",
    seller: "gopher",
  },
  {
    id: 2,
    name: "Strength Brew",
    price: 45,
    description: "Increases attack power for 10 minutes",
    image:
      "https://images.unsplash.com/photo-1748466989671-07e55c0c55b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBwb3Rpb24lMjBib3R0bGV8ZW58MXx8fHwxNzYzMzI5NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "rare",
    seller: "gopher",
  },
  {
    id: 3,
    name: "Mana Potion",
    price: 35,
    description: "Restores 100 mana points",
    image:
      "https://images.unsplash.com/photo-1588464190748-fd4cf6ab1909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwcG90aW9uJTIwdmlhbHxlbnwxfHx8fDE3NjMzMjk1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "common",
    seller: "gopher",
  },
  {
    id: 4,
    name: "Elixir of Vitality",
    price: 120,
    description: "Grants immunity to poison for 1 hour",
    image:
      "https://images.unsplash.com/photo-1744233277849-029cd7f525d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVsaXhpciUyMGJvdHRsZXxlbnwxfHx8fDE3NjMzMjk1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "gopher",
  },
  // Elephant's Amulets
  {
    id: 5,
    name: "Amulet of Protection",
    price: 80,
    description: "Reduces incoming damage by 15%",
    image:
      "https://images.unsplash.com/photo-1762337371111-b4c6197f82eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXVsZXQlMjBwZW5kYW50JTIwamV3ZWxyeXxlbnwxfHx8fDE3NjMzMjk1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "rare",
    seller: "elephant",
  },
  {
    id: 6,
    name: "Crystal Charm",
    price: 150,
    description: "Enhances magical abilities by 25%",
    image:
      "https://images.unsplash.com/photo-1646706092877-3838b144f011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwbmVja2xhY2UlMjBtYWdpY3xlbnwxfHx8fDE3NjMzMjk1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "elephant",
  },
  {
    id: 7,
    name: "Golden Talisman",
    price: 95,
    description: "Increases luck and rare item drops",
    image:
      "https://images.unsplash.com/photo-1761210875101-1273b9ae5600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY2hhcm0lMjBwZW5kYW50fGVufDF8fHx8MTc2MzMyOTUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "rare",
    seller: "elephant",
  },
  {
    id: 8,
    name: "Ancient Medallion",
    price: 250,
    description: "Grants the wearer mystical visions",
    image:
      "https://images.unsplash.com/photo-1759604369651-0950c841c81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMHRhbGlzbWFufGVufDF8fHx8MTc2MzMyOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "legendary",
    seller: "elephant",
  },
  // Dinosaur's Weapons
  {
    id: 9,
    name: "Enchanted Wand",
    price: 70,
    description: "Basic spell casting wand, +10 magic damage",
    image:
      "https://images.unsplash.com/photo-1585810226032-ec818d792953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXphcmQlMjB3YW5kJTIwd29vZGVufGVufDF8fHx8MTc2MzMyOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "common",
    seller: "dinosaur",
  },
  {
    id: 10,
    name: "Knight's Longsword",
    price: 180,
    description: "Forged steel blade, +40 attack damage",
    image:
      "https://images.unsplash.com/photo-1757083840090-17a7bfca08c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwd2VhcG9ufGVufDF8fHx8MTc2MzMyODI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "dinosaur",
  },
  {
    id: 11,
    name: "Archmage Staff",
    price: 220,
    description: "Legendary staff, casts devastating spells",
    image:
      "https://images.unsplash.com/photo-1759207291235-75bcc145b20d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwc3RhZmYlMjBtYWdpY3xlbnwxfHx8fDE3NjMzMjk1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "legendary",
    seller: "dinosaur",
  },
  {
    id: 12,
    name: "Assassin's Dagger",
    price: 140,
    description: "Swift blade with +50% critical strike",
    image:
      "https://images.unsplash.com/photo-1613504113118-f2a45ece270e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZGFnZ2VyJTIwYmxhZGV8ZW58MXx8fHwxNzYzMzI5NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "dinosaur",
  },
];
