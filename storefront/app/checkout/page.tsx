"use client";

import { useCart } from "../../context/CartContext";
import { Button } from "../../components/ui/Button";
import { Separator } from "../../components/ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cart, checkout, removeFromCart } = useCart();
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleFinalizePurchase = async () => {
    await checkout();
    router.push("/"); // Redirect to home page after checkout
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-amber-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-amber-400 mb-8 font-medieval">
        Checkout
      </h1>

      {cart.length === 0
        ? (
          <div className="text-center text-slate-400 text-lg">
            Your cart is empty.{" "}
            <Link href="/" className="text-amber-400 hover:underline">
              Continue Shopping
            </Link>
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-900 p-6 rounded-lg border border-amber-600/30">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-slate-800 rounded-lg border border-amber-600/20 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-amber-400 text-base truncate">
                        {item.name}
                      </h4>
                      <p className="text-slate-400 text-sm">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-amber-300 text-base">
                        {item.price * item.quantity} gold
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-950 flex-shrink-0"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-1 bg-slate-900 p-6 rounded-lg border border-amber-600/30 h-fit">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">
                Order Total
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-lg">
                    Items ({totalItems}):
                  </span>
                  <span className="text-amber-300 text-xl">
                    {totalPrice} gold
                  </span>
                </div>
                <Separator className="my-4 bg-amber-600/30" />
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-xl font-bold">
                    Total:
                  </span>
                  <span className="text-amber-300 text-3xl font-bold">
                    {totalPrice} gold
                  </span>
                </div>
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-slate-900 text-lg py-3 mt-6"
                  onClick={handleFinalizePurchase}
                  disabled={cart.length === 0}
                >
                  Finalize Purchase
                </Button>
              </div>
            </div>
          </div>
        )}
    </main>
  );
}
