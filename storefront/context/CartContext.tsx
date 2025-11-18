"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem, Product } from "../lib/data";
import { createOrder } from "../lib/apiClient";
import { eraseCookie, getCookie, setCookie } from "../lib/cookies"; // Import cookie functions

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>; // Add checkout to the interface
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_COOKIE_NAME = "shopping_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from cookie on initial mount
  useEffect(() => {
    const storedCart = getCookie(CART_COOKIE_NAME);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart from cookie", e);
        eraseCookie(CART_COOKIE_NAME); // Clear invalid cookie
      }
    }
  }, []);

  // Save cart to cookie whenever cart state changes
  useEffect(() => {
    if (cart.length > 0) {
      setCookie(CART_COOKIE_NAME, JSON.stringify(cart), 7); // Store for 7 days
    } else {
      eraseCookie(CART_COOKIE_NAME); // Clear cookie if cart is empty
    }
  }, [cart]);

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

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    eraseCookie(CART_COOKIE_NAME); // Ensure cookie is cleared
  };

  const checkout = async () => {
    try {
      const userId = getCookie("userId");
      if (!userId) {
        throw new Error("User not found. Please refresh the page.");
      }

      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      await createOrder({
        user_id: userId,
        products: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        total_price: totalPrice,
      });

      for (const item of cart) {
        const [sellerId, productName] = item.id.split("-");
        if (!sellerId || !productName) {
          throw new Error(`Invalid item ID in cart: ${item.id}`);
        }
      }
      clearCart();
      alert("Checkout successful! Your order has been placed.");
    } catch (error: any) {
      alert(`Checkout failed: ${error.message}`);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, checkout }} // Add checkout to value
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
