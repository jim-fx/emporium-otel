"use client";

import { Product } from "../lib/data";
import { useCart } from "../context/CartContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  sellerId: string;
  sellerName: string; // Add sellerName prop
}

const rarityColors = {
  common: "bg-slate-500",
  uncommon: "bg-green-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
};

export function ProductDetails(
  { product, sellerId, sellerName }: ProductDetailsProps,
) {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/seller/${sellerId}`}
          className="text-amber-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {sellerName}
        </Link>
      </div>
      <div className="grid grid-cols-1 justify-items-end md:justify-items-center md:grid-cols-2 gap-8 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-fit h-full max-h-[70vh] object-cover rounded-xl"
        />
        <div className="text-white">
          <h1 className="text-4xl font-bold text-amber-400 mb-2 font-medieval">
            {product.name}
          </h1>
          <p className="text-slate-400 text-lg mb-4">
            by{" "}
            <Link
              href={`/seller/${sellerId}`}
              className="text-amber-300 hover:underline"
            >
              {sellerName}
            </Link>
          </p>
          <Badge className={`${rarityColors[product.rarity]} border-0 mb-4`}>
            {product.rarity}
          </Badge>
          <p className="text-slate-300 mb-6">{product.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="font-medieval text-4xl flex items-center gap-2 text-amber-300">
              {product.price} <img src="/coin.webp" className="w-8 h-8" />
            </span>
            <span className="text-slate-400">
              {product.stock} in stock
            </span>
          </div>
          <Button
            onClick={() => addToCart(product)}
            className="w-full justify-center bg-amber-600 hover:bg-amber-700 text-slate-900 p-4 rounded-lg text-lg font-bold"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
