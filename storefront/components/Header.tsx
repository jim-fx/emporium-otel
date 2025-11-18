"use client";
import { Sparkles } from "lucide-react";
import { ShoppingCartDrawer } from "./ShoppingCartDrawer";
import { useCart } from "../context/CartContext";

export function Header() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <header className="sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-3">
            <img src="/favicon.webp" alt="file" width="50" />
            <h1 className="text-amber-400 text-shadow-lg">
              Maxwell's Magical Emporium
            </h1>
          </div>
        </a>
        <ShoppingCartDrawer
          items={cart}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
        />
      </div>
    </header>
  );
}
