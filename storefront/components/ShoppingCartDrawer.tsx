import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartDrawerProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

export function ShoppingCartDrawer(
  { items, onRemoveItem, onClearCart }: ShoppingCartDrawerProps,
) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative border-amber-600 text-amber-400 hover:bg-amber-600/20"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-600 border-0 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-slate-900 border-l-2 border-amber-600/30 w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-amber-400">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full mt-4">
          {items.length === 0
            ? (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                Your cart is empty
              </div>
            )
            : (
              <>
                <ScrollArea className="flex-1 -mx-6 px-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-slate-800 rounded-lg border border-amber-600/20"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-amber-400 text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-amber-300 text-sm">
                            {item.price * item.quantity} gold
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-950"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator className="my-4 bg-amber-600/30" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total:</span>
                    <span className="text-amber-300 text-xl">
                      {totalPrice} gold
                    </span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-slate-900">
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-400 hover:bg-red-950"
                    onClick={onClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
