"use client";
import { useState } from "react";
import { ProductCard } from "./ProductCard.tsx";
import { Product } from "../lib/data.ts";
import { Button } from "./ui/Button.tsx";

type Props = {
  products: Product[];
};

type SortKey = "price" | "rarity";
type SortOrder = "asc" | "desc";

const rarityOrder: Record<Product["rarity"], number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
};

export function Main({ products }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedProducts = [...products].sort((a, b) => {
    let compareA;
    let compareB;

    if (sortKey === "rarity") {
      compareA = rarityOrder[a.rarity];
      compareB = rarityOrder[b.rarity];
    } else {
      compareA = a.price;
      compareB = b.price;
    }

    if (compareA < compareB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (compareA > compareB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-amber-400 mb-3">Welcome, Brave Adventurer!</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Browse our collection of mystical items. Use the sorting options to
          find the perfect gear for your next adventure.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={() => setSortKey("price")}
          className={`p-2 rounded-md border border-amber-600 text-amber-400 hover:bg-amber-600/20 ${
            sortKey === "price" ? "bg-amber-600/30" : ""
          }`}
        >
          Sort by Price
        </Button>
        <Button
          onClick={() => setSortKey("rarity")}
          className={`p-2 rounded-md border border-amber-600 text-amber-400 hover:bg-amber-600/20 ${
            sortKey === "rarity" ? "bg-amber-600/30" : ""
          }`}
        >
          Sort by Rarity
        </Button>
        <Button
          onClick={toggleSortOrder}
          className="p-2 rounded-md border border-amber-600 text-amber-400 hover:bg-amber-600/20"
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}
