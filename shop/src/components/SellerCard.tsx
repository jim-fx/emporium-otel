import { Card } from "./ui/card";

interface SellerCardProps {
  name: string;
  description: string;
  character: string;
  color: string;
}

export function SellerCard({ name, description, character, color }: SellerCardProps) {
  return (
    <Card className="p-6 border-2 border-amber-600/30 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="flex items-center gap-4">
        <div className={`text-6xl ${color}`}>
          {character}
        </div>
        <div>
          <h3 className="text-amber-400">{name}</h3>
          <p className="text-slate-400">{description}</p>
        </div>
      </div>
    </Card>
  );
}
