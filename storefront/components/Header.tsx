"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from "../lib/clientCookies.ts";
import { ShoppingCartDrawer } from "./ShoppingCartDrawer.tsx";
import { useCart } from "../context/CartContext.tsx";

export function Header() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-3">
            <img src="/favicon.webp" alt="file" width="50" />
            <h1 className="text-gold text-shadow-lg">
              Otellos Magical Emporium
            </h1>
          </div>
        </a>
        <div className="flex items-center gap-4">
          {username && (
            <Link href="/profile">
              <div className="text-gold text-shadow-sm flex items-center gap-2 cursor-pointer hover:underline">
                <span>Welcome, {username}</span>
              </div>
            </Link>
          )}
          <ShoppingCartDrawer
            items={cart}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </header>
  );
}
