import { Main } from "../components/Main.tsx";

async function listProducts() {
  const potionRes = await fetch("http://potion-seller/items");
  const potions = await potionRes.json();

  const charmRes = await fetch("http://charm-seller/items");
  const charms = await charmRes.json();

  const weaponsRes = await fetch("http://weapon-seller/items");
  const weapons = await weaponsRes.json();

  return [
    ...potions.items,
    ...charms.items,
    ...weapons.items,
  ];
}

export default async function Home() {
  const items = await listProducts();
  return <Main products={items} />;
}
