import { Main } from "../components/Main.tsx";

async function listProducts() {
  const potionRes = await fetch("http://potion-seller/items");
  const potions = await potionRes.json();

  const charmRes = await fetch("http://charm-seller/items");
  const charms = await charmRes.json();

  const wandRes = await fetch("http://wand-seller/items");
  const wands = await wandRes.json();

  return [
    ...potions.items,
    ...charms.items,
    ...wands.items,
  ];
}

export default async function Home() {
  const items = await listProducts();
  return <Main products={items} />;
}
