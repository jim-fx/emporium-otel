// app/api/checkout/route.ts

import { NextResponse } from "next/server";
import { purchaseItem } from "../../../lib/apiClient";
import { CartItem } from "../../../lib/data";

export async function POST(request: Request) {
  try {
    const cart: CartItem[] = await request.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const purchasePromises = cart.map(async (item) => {
      const [sellerId, productName] = item.id.split("-");
      if (!sellerId || !productName) {
        throw new Error(`Invalid item ID in cart: ${item.id}`);
      }
      await purchaseItem(sellerId, productName, item.quantity);
    });

    await Promise.all(purchasePromises);

    return NextResponse.json({ message: "Checkout successful" }, { status: 200 });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ message: `Checkout failed: ${error.message}` }, { status: 500 });
  }
}
