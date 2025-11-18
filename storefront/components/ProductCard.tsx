"use client";
import { Card } from "./ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
import { useCart } from "../context/CartContext.tsx";
import { Product } from "../lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

interface ProductCardProps {
  product: Product;
}

const rarityColors = {
  common: "bg-slate-500",
  uncommon: "bg-green-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
};

const getGlowClass = (rarity: Product["rarity"]) => {
  switch (rarity) {
    case "epic":
      return "shadow-purple-500/50 shadow-lg";
    case "legendary":
      return "shadow-amber-500/50 shadow-lg";
    default:
      return "";
  }
};

export function ProductCard({ product }: ProductCardProps) {
  const { name, price, description, image, rarity, seller } = product;
  const { addToCart } = useCart();
  const router = useRouter(); // Initialize useRouter

  const handleSellerClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the outer Link from navigating
    e.stopPropagation(); // Stop event propagation
    router.push(`/seller/${seller}`);
  };

  return (
    <div
      className={`wooden-frame h-full flex flex-col 
        text-card-foreground flex flex-col gap-6 rounded-xl border
        ${getGlowClass(rarity)}
        `}
    >
      <Link href={`/seller/${seller}/${name}`} className="z-10">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-position-top w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
          />
          <Badge
            className={`absolute top-2 right-2 ${
              rarityColors[rarity]
            } border-0`}
          >
            {rarity}
          </Badge>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow z-10">
        <Link
          href={`/seller/${seller}/${name}`}
          className="text-amber-300"
        >
          <h4 className="text-amber-400 mb-1">{name}</h4>
          {" "}
        </Link>
        <Link
          href={`/seller/${seller}`}
          className="text-amber-300"
        >
          <span
            onClick={handleSellerClick} // Use onClick handler
            className="text-slate-500 text-xs hover:underline mb-2 cursor-pointer" // Added cursor-pointer
          >
            by {seller}
          </span>
        </Link>
        <p className="text-slate-400 text-sm mb-4 flex-grow">
          {description.slice(0, 100)}...
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-medieval text-2xl flex items-center gap-2 text-amber-300">
            {price} <img src="/coin.webp" className="w-6 h-6" />
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="buy h-10 z-10"
          >
            <img src="/button.webp" style={{ height: "100%" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
