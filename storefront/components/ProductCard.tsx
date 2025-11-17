"use client";
import { Card } from "./ui/card.tsx";
import { Button } from "./ui/Button.tsx";
import { Badge } from "./ui/badge.tsx";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext.tsx";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const rarityColors = {
  common: "bg-slate-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
};

const getGlowClass = (rarity: ProductCardProps["rarity"]) => {
  switch (rarity) {
    case "epic":
      return "shadow-purple-500/50 shadow-lg";
    case "legendary":
      return "shadow-amber-500/50 shadow-lg";
    default:
      return "";
  }
};

export function ProductCard(
  { name, price, description, image, rarity }: ProductCardProps,
) {
  const { addToCart } = useCart();

  return (
    <Card
      className={`overflow-hidden border-2 border-amber-600/30 bg-gradient-to-br from-slate-800 to-slate-900 hover:border-amber-600/60 transition-all group ${
        getGlowClass(rarity)
      }`}
    >
      <div className="aspect-square relative overflow-hidden bg-slate-950">
        <img
          src={`/products/${name}.png`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge
          className={`absolute top-2 right-2 ${rarityColors[rarity]} border-0`}
        >
          {rarity}
        </Badge>
      </div>
      <div className="p-4">
        <h4 className="text-amber-400 mb-2">{name}</h4>
        <p className="text-slate-400 text-sm mb-4">{description.slice(0, 200)}</p>
        <div className="flex items-center justify-between">
          <span className="font-medieval text-2xl flex items-center gap-2 text-amber-300">
            {price} <img src="/coin.png" className="w-6 h-6" />
          </span>
          <button onClick={addToCart} className="buy h-10">
            <img src="/button.png" style={{ height: "100%" }} />
          </button>
        </div>
      </div>
    </Card>
  );
}
