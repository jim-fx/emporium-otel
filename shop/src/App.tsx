import { useState } from "react";
import { SellerCard } from "./components/SellerCard";
import { ProductCard } from "./components/ProductCard";
import { ShoppingCartDrawer } from "./components/ShoppingCartDrawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Sparkles } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  seller: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const products: Product[] = [
  // Gopher's Potions
  {
    id: 1,
    name: "Healing Elixir",
    price: 25,
    description: "Restores 50 health points instantly",
    image: "https://images.unsplash.com/photo-1610270066297-7b06341d2b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rpb24lMjBib3R0bGVzJTIwbWFnaWN8ZW58MXx8fHwxNzYzMzI5NTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "common",
    seller: "gopher"
  },
  {
    id: 2,
    name: "Strength Brew",
    price: 45,
    description: "Increases attack power for 10 minutes",
    image: "https://images.unsplash.com/photo-1748466989671-07e55c0c55b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBwb3Rpb24lMjBib3R0bGV8ZW58MXx8fHwxNzYzMzI5NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "rare",
    seller: "gopher"
  },
  {
    id: 3,
    name: "Mana Potion",
    price: 35,
    description: "Restores 100 mana points",
    image: "https://images.unsplash.com/photo-1588464190748-fd4cf6ab1909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwcG90aW9uJTIwdmlhbHxlbnwxfHx8fDE3NjMzMjk1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "common",
    seller: "gopher"
  },
  {
    id: 4,
    name: "Elixir of Vitality",
    price: 120,
    description: "Grants immunity to poison for 1 hour",
    image: "https://images.unsplash.com/photo-1744233277849-029cd7f525d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVsaXhpciUyMGJvdHRsZXxlbnwxfHx8fDE3NjMzMjk1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "gopher"
  },
  // Elephant's Amulets
  {
    id: 5,
    name: "Amulet of Protection",
    price: 80,
    description: "Reduces incoming damage by 15%",
    image: "https://images.unsplash.com/photo-1762337371111-b4c6197f82eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXVsZXQlMjBwZW5kYW50JTIwamV3ZWxyeXxlbnwxfHx8fDE3NjMzMjk1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "rare",
    seller: "elephant"
  },
  {
    id: 6,
    name: "Crystal Charm",
    price: 150,
    description: "Enhances magical abilities by 25%",
    image: "https://images.unsplash.com/photo-1646706092877-3838b144f011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwbmVja2xhY2UlMjBtYWdpY3xlbnwxfHx8fDE3NjMzMjk1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "elephant"
  },
  {
    id: 7,
    name: "Golden Talisman",
    price: 95,
    description: "Increases luck and rare item drops",
    image: "https://images.unsplash.com/photo-1761210875101-1273b9ae5600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY2hhcm0lMjBwZW5kYW50fGVufDF8fHx8MTc2MzMyOTUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "rare",
    seller: "elephant"
  },
  {
    id: 8,
    name: "Ancient Medallion",
    price: 250,
    description: "Grants the wearer mystical visions",
    image: "https://images.unsplash.com/photo-1759604369651-0950c841c81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMHRhbGlzbWFufGVufDF8fHx8MTc2MzMyOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "legendary",
    seller: "elephant"
  },
  // Dinosaur's Weapons
  {
    id: 9,
    name: "Enchanted Wand",
    price: 70,
    description: "Basic spell casting wand, +10 magic damage",
    image: "https://images.unsplash.com/photo-1585810226032-ec818d792953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXphcmQlMjB3YW5kJTIwd29vZGVufGVufDF8fHx8MTc2MzMyOTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "common",
    seller: "dinosaur"
  },
  {
    id: 10,
    name: "Knight's Longsword",
    price: 180,
    description: "Forged steel blade, +40 attack damage",
    image: "https://images.unsplash.com/photo-1757083840090-17a7bfca08c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwd2VhcG9ufGVufDF8fHx8MTc2MzMyODI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "dinosaur"
  },
  {
    id: 11,
    name: "Archmage Staff",
    price: 220,
    description: "Legendary staff, casts devastating spells",
    image: "https://images.unsplash.com/photo-1759207291235-75bcc145b20d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwc3RhZmYlMjBtYWdpY3xlbnwxfHx8fDE3NjMzMjk1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "legendary",
    seller: "dinosaur"
  },
  {
    id: 12,
    name: "Assassin's Dagger",
    price: 140,
    description: "Swift blade with +50% critical strike",
    image: "https://images.unsplash.com/photo-1613504113118-f2a45ece270e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZGFnZ2VyJTIwYmxhZGV8ZW58MXx8fHwxNzYzMzI5NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rarity: "epic",
    seller: "dinosaur"
  },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b-2 border-amber-600/30 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-amber-400">The Mystic Bazaar</h1>
              <p className="text-slate-400 text-sm">Ye Olde Fantasy Emporium</p>
            </div>
          </div>
          <ShoppingCartDrawer
            items={cart}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-amber-400 mb-3">Welcome, Brave Adventurer!</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Journey through our enchanted market and discover mystical items from three legendary merchants.
            Each offers their own unique treasures to aid you in your quest.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-slate-800 border border-amber-600/30">
            <TabsTrigger value="all" className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900">
              All Items
            </TabsTrigger>
            <TabsTrigger value="gopher" className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900">
              🔵 Potions
            </TabsTrigger>
            <TabsTrigger value="elephant" className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900">
              🔵 Charms
            </TabsTrigger>
            <TabsTrigger value="dinosaur" className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900">
              🦴 Weapons
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            {/* Gopher Section */}
            <section>
              <SellerCard
                name="Bartholomew's Potions"
                description="Master alchemist specializing in healing and enhancement elixirs"
                character="🔵"
                color="brightness-110"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {products.filter(p => p.seller === "gopher").map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            </section>

            {/* Elephant Section */}
            <section>
              <SellerCard
                name="Elara's Enchantments"
                description="Purveyor of mystical amulets and protective charms"
                character="🐘"
                color="brightness-110 hue-rotate-180"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {products.filter(p => p.seller === "elephant").map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            </section>

            {/* Dinosaur Section */}
            <section>
              <SellerCard
                name="Grimjaw's Armory"
                description="Ancient warrior offering legendary weapons and wands"
                character="🦴"
                color="grayscale brightness-150"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {products.filter(p => p.seller === "dinosaur").map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="gopher">
            <SellerCard
              name="Bartholomew's Potions"
              description="Master alchemist specializing in healing and enhancement elixirs"
              character="🔵"
              color="brightness-110"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {products.filter(p => p.seller === "gopher").map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="elephant">
            <SellerCard
              name="Elara's Enchantments"
              description="Purveyor of mystical amulets and protective charms"
              character="🐘"
              color="brightness-110 hue-rotate-180"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {products.filter(p => p.seller === "elephant").map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dinosaur">
            <SellerCard
              name="Grimjaw's Armory"
              description="Ancient warrior offering legendary weapons and wands"
              character="🦴"
              color="grayscale brightness-150"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {products.filter(p => p.seller === "dinosaur").map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-amber-600/30 bg-slate-900/80 mt-16 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            The Mystic Bazaar © Year of the Dragon 1425
          </p>
          <p className="text-slate-500 text-sm mt-2">
            "Quality magical goods since the First Age"
          </p>
        </div>
      </footer>
    </div>
  );
}
