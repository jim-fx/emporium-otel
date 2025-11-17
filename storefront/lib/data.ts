export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  seller: string;
  stock: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
