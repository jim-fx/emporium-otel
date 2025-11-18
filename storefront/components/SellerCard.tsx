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
    <Card className="bg-rusty mt-20 p-6 border-2 border-amber-600/30 py-12">
      <div className="flex items-center gap-12">
        <div className="flex-shrink-0 -mt-12 -mb-15">
          <img
            src={`/characters/${character}`}
            alt={name}
            className="h-50 ml-5 -mt-10 origin-bottom scale-[1.2]"
          />
        </div>
        <div>
          <h3
            style={{ fontFamily: "MedievalSharp" }}
            className="text-4xl text-amber-400"
          >
            {name}
          </h3>
          <p className="text-slate-400">{description}</p>
        </div>
      </div>
    </Card>
  );
}
