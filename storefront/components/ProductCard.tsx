import { Card } from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import { Badge } from "./ui/badge.tsx";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  onAddToCart: () => void;
}

const rarityColors = {
  common: "bg-slate-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
};

export function ProductCard(
  { name, price, description, image, rarity, onAddToCart }: ProductCardProps,
) {
  return (
    <Card className="overflow-hidden border-2 border-amber-600/30 bg-gradient-to-br from-slate-800 to-slate-900 hover:border-amber-600/60 transition-all group">
      <div className="aspect-square relative overflow-hidden bg-slate-950">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge
          className={`absolute top-2 right-2 ${rarityColors[rarity]} border-0`}
        >
          {rarity}
        </Badge>
      </div>
      <div className="p-4">
        <h4 className="text-amber-400 mb-2">{name}</h4>
        <p className="text-slate-400 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-amber-300">
            {price} <span className="text-sm">gold</span>
          </span>
          <Button
            size="sm"
            onClick={onAddToCart}
            className="bg-amber-600 hover:bg-amber-700 text-slate-900"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
