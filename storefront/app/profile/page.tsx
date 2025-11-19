import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { tracedFetch } from "../../lib/tracingFetch.ts";

async function getUserOrders(userId: string) {
  if (!userId) {
    return [];
  }

  const orderResponse = await tracedFetch(
    `http://order-service/orders/user/${userId}`,
  );

  if (!orderResponse.ok) {
    const errorData = await orderResponse.json();
    console.log({ errorData });
    return [];
  }

  const data = await orderResponse.json();
  return data;
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value ?? null;
  const userId = cookieStore.get("userId")?.value ?? null;

  const orders = await getUserOrders(userId);

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
        Your Profile - {username} / {userId}
      </h1>

      <div className="wooden-frame bg-slate-900 p-12 rounded-lg border border-amber-600/30">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Your Orders</h2>
        {orders.length === 0
          ? <p className="text-slate-400">No orders found for this user.</p>
          : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-slate-800 rounded-lg border border-amber-600/20"
                >
                  <p className="text-amber-400">Order ID: {order.id}</p>
                  <p className="text-slate-400">
                    Total Price: {order.totalPrice} gold
                  </p>
                  <p className="text-slate-400">
                    Products: {order.products.map((o) => o.name).join(", ")}
                  </p>
                  <p className="text-slate-400">
                    Ordered At: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  );
}
