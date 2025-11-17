import { Main } from "../components/Main.tsx";

async function listProducts() {
  const potionRes = await fetch("http://potion-seller/items");
  const potions = await potionRes.json();

  const amuletRes = await fetch("http://amulet-seller/items");
  const amulets = await amuletRes.json();

  const wandRes = await fetch("http://wand-seller/items");
  const wands = await wandRes.json();
  console.log({ wands, amulets, potions });

  return [
    ...potions.items,
    ...amulets.items,
    ...wands.items,
  ];
}

export default async function Home() {
  const items = await listProducts();
  return <Main products={items} />;
}
