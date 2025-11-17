import { Main } from "../components/Main.tsx";
import { listProducts } from "../lib/apiClient";

export default async function Home() {
  const items = await listProducts();
  return <Main products={items} />;
}
