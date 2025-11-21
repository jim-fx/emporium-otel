import { Product } from "./data";
import { sellers } from "./sellers";

// As defined in openapi.yaml
interface ApiProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  description: string;
  quantity: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  type: "charm" | "weapon" | "potion";
}

// From order-service
interface ProductDetail {
  name: string;
  id: string;
  quantity: number;
}

interface OrderCreate {
  user_id: string;
  products: ProductDetail[];
  total_price: number;
}

interface ApiOrder {
  id: string;
  userId: string;
  products: string[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

async function fetchProductsFromSeller(sellerId: string): Promise<Product[]> {
  const seller = sellers.find((s) => s.id === sellerId);
  if (!seller) {
    throw new Error(`Seller not found: ${sellerId}`);
  }

  const response = await fetch(`${seller.url}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products from ${seller.name}`);
  }

  const text = await response.text();

  try {
    const data: { products: ApiProduct[] } = JSON.parse(text);
    return data.products.map((apiProduct) => ({
      id: apiProduct.id,
      name: apiProduct.name,
      price: apiProduct.price,
      description: apiProduct.description,
      rarity: apiProduct.rarity,
      stock: apiProduct.stock,
      seller: seller.id,
      quantity: apiProduct.quantity,
      image: apiProduct.image || `/products/${apiProduct.name}.png`,
    }));
  } catch (e: any) {
    console.log({ text });
    throw new Error(
      `Failed to parse products from ${seller.url}, ${e?.message}`,
    );
  }
}

export async function getProduct(
  sellerId: string,
  productName: string,
): Promise<Product> {
  const seller = sellers.find((s) => s.id === sellerId);
  if (!seller) {
    throw new Error(`Seller not found: ${sellerId}`);
  }

  const productUrl = `${seller.url}/products/${productName}`;

  console.log({ productUrl });

  const response = await fetch(productUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch products from ${seller.name}`);
  }

  const text = await response.text();

  try {
    const apiProduct: ApiProduct = JSON.parse(text);
    return {
      id: apiProduct.id,
      name: apiProduct.name,
      price: apiProduct.price,
      description: apiProduct.description,
      rarity: apiProduct.rarity,
      stock: apiProduct.stock,
      seller: seller.id,
      image: apiProduct.image || `/products/${apiProduct.name}.png`,
    };
  } catch (e: any) {
    throw new Error(
      `Failed to parse products from ${seller.url}, ${e?.message}`,
    );
  }
}

export async function listProducts(): Promise<Product[]> {
  const allProducts = await Promise.all(
    sellers.map((seller) => fetchProductsFromSeller(seller.id)),
  );
  return allProducts.flat();
}

export function getProductsBySeller(
  sellerId: string,
): Promise<Product[]> {
  return fetchProductsFromSeller(sellerId);
}

export async function createOrder(order: OrderCreate): Promise<void> {
  const response = await fetch(`/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `Failed to create order`);
  }
}

export async function getUserOrders(userId: string): Promise<ApiOrder[]> {
  const response = await fetch(`/api/orders?userId=${userId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || `Failed to fetch orders for user ${userId}`,
    );
  }

  return response.json();
}
