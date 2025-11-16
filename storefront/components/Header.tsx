"use client";
import { Sparkles } from "lucide-react";
import { ShoppingCartDrawer } from "./ShoppingCartDrawer";
import { Product } from "../lib/data.ts";
import { useState } from "react";

export function Header() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };
  return (
    <header className="sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="file" width="50" />
          <h1 className="text-amber-400">Maxwell's Arcane Emporium</h1>
        </div>
        <ShoppingCartDrawer
          items={cart}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
        />
      </div>
    </header>
  );
}
