import { getProductsBySeller } from "../../../lib/apiClient.ts";
import { sellers } from "../../../lib/sellers.ts";
import { ProductCard } from "../../../components/ProductCard.tsx";
import { SellerCard } from "../../../components/SellerCard.tsx";
import { notFound } from "next/navigation";

type Props = {
  params: {
    sellerId: string;
  };
};

export default async function SellerPage({ params }: Props) {
  const { sellerId } = await params;
  console.log({ sellerId });
  const seller = sellers.find((s) => s.id === sellerId);

  if (!seller) {
    notFound();
  }

  const products = await getProductsBySeller(sellerId);

  return (
    <main className="container mx-auto px-4 py-8">
      <SellerCard
        name={seller.name}
        character={seller.character}
        description={seller.description}
        color={seller.color}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return sellers.map((seller) => ({
    sellerId: seller.id,
  }));
}
