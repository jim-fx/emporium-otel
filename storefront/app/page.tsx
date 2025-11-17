import { Main } from "../components/Main.tsx";

export default async function Home() {
  const data = await fetch("http://potion-seller/items");
  const posts = await data.json();
  return <Main products={posts.items} />;
}
