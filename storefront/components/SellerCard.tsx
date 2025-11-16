import { Card } from "./ui/card";

interface SellerCardProps {
  name: string;
  description: string;
  character: string;
  color: string;
}

export function SellerCard(
  { name, description, character }: SellerCardProps,
) {
  return (
    <Card className="p-6 border-2 border-amber-600/30 bg-gradient-to-br from-slate-800 to-slate-900 overflow-visible">
      <div className="flex items-center gap-12">
        <div className="flex-shrink-0 -mt-4">
          <img
            src={`/characters/${character}`}
            alt={name}
            className="h-40 origin-bottom scale-[1.5]"
          />
        </div>
        <div>
          <h3 className="text-amber-400">{name}</h3>
          <p className="text-slate-400">{description}</p>
        </div>
      </div>
    </Card>
  );
}
