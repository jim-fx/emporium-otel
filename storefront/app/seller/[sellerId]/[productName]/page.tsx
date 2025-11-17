import { getProduct, listProducts } from "../../../../lib/apiClient.ts";
import { ProductDetails } from "../../../../components/ProductDetails.tsx";
import { notFound } from "next/navigation";
import { sellers } from "../../../../lib/sellers.ts"; // Import sellers

type Props = {
  params: {
    sellerId: string;
    productName: string;
  };
};

export default async function ProductPage(
  { params }: Props,
) {
  const { sellerId, productName } = await params;
  // URL-decode the product name
  const decodedProductName = decodeURIComponent(productName);
  const product = await getProduct(sellerId, decodedProductName);

  if (!product) {
    notFound();
  }

  const seller = sellers.find((s) => s.id === sellerId); // Find the seller
  if (!seller) {
    notFound(); // Should not happen if product exists, but good for type safety
  }

  return <ProductDetails product={product} sellerId={sellerId} sellerName={seller.name} />;
}

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({
    sellerId: product.seller,
    productName: encodeURIComponent(product.name),
  }));
}
