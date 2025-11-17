"use client";
import { SellerCard } from "./SellerCard.tsx";
import { ProductCard } from "./ProductCard.tsx";
import { Product } from "../lib/data.ts";
import { sellers } from "../lib/sellers.ts";
import { useCart } from "../context/CartContext.tsx";

type Props = {
  products: Product[];
};

export function Main({ products }: Props) {
  const { addToCart } = useCart();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-amber-400 mb-3">Welcome, Brave Adventurer!</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Journey through our enchanted market and discover mystical items from
          three legendary merchants. Each offers their own unique treasures to
          aid you in your quest.
        </p>
      </div>

      {sellers.map((seller) => (
        <section key={seller.id}>
          <SellerCard
            name={seller.name}
            character={seller.character}
            description={seller.description}
            color={seller.color}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {products.filter((p) => p.type === seller.productType).map((
              product,
            ) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
