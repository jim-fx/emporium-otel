"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs.tsx";
import { SellerCard } from "./SellerCard.tsx";
import { ProductCard } from "./ProductCard.tsx";
import { products } from "../lib/data.ts";

export function Main() {
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-slate-800 border border-amber-600/30">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900"
          >
            All Items
          </TabsTrigger>
          <TabsTrigger
            value="gopher"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900"
          >
            🔵 Potions
          </TabsTrigger>
          <TabsTrigger
            value="elephant"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900"
          >
            🔵 Charms
          </TabsTrigger>
          <TabsTrigger
            value="dinosaur"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-slate-900"
          >
            🦴 Weapons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-12">
          {/* Gopher Section */}
          <section>
            <SellerCard
              name="Bartholomew's Potions"
              character="gopher_dark_transparent.png"
              description="Master alchemist specializing in healing and enhancement elixirs"
              color="brightness-110"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {products.filter((p) => p.seller === "gopher").map((
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

          {/* Elephant Section */}
          <section>
            <SellerCard
              name="Elara's Enchantments"
              description="Purveyor of mystical amulets and protective charms"
              character="elephant_dark_transparent.png"
              color="brightness-110 hue-rotate-180"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {products.filter((p) => p.seller === "elephant").map((
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

          {/* Dinosaur Section */}
          <section>
            <SellerCard
              name="Grimjaw's Armory"
              description="Ancient warrior offering legendary weapons and wands"
              character="denosaur_dark_transparent.png"
              color="grayscale brightness-150"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {products.filter((p) => p.seller === "dinosaur").map((
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
        </TabsContent>

        <TabsContent value="gopher">
          <SellerCard
            name="Bartholomew's Potions"
            description="Master alchemist specializing in healing and enhancement elixirs"
            character="🔵"
            color="brightness-110"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {products.filter((p) => p.seller === "gopher").map((product) => (
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
            {products.filter((p) => p.seller === "elephant").map((
              product,
            ) => (
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
            {products.filter((p) => p.seller === "dinosaur").map((
              product,
            ) => (
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
  );
}
