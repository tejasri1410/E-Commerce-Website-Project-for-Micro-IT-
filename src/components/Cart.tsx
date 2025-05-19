
import React from "react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";

interface CartItemRowProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  updateQuantity,
  removeItem,
}) => (
  <div className="flex items-center py-4 gap-3 animate-fade-in">
    <div className="w-16 h-16 rounded-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-sm truncate">{name}</h4>
      <div className="text-muted-foreground text-xs mt-1">${price.toFixed(2)}</div>
      
      <div className="flex items-center mt-2 space-x-2">
        <div className="flex items-center border rounded-full">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full p-0"
            onClick={() => updateQuantity(id, quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center text-sm">{quantity}</span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full p-0"
            onClick={() => updateQuantity(id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 rounded-full p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => removeItem(id)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
    
    <div className="font-medium">
      ${(price * quantity).toFixed(2)}
    </div>
  </div>
);

const FloatingCart: React.FC = () => {
  const { toggleCart, totalItems } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="floating-cart h-14 w-14 flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
          onClick={toggleCart}
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 min-w-[1.5rem] h-6 px-1 flex items-center justify-center animate-scale-in">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <CartContent />
    </Sheet>
  );
};

const CartContent: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  return (
    <SheetContent className="w-full sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" /> Your Cart
        </SheetTitle>
      </SheetHeader>
      
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="font-medium text-lg">Your cart is empty</h3>
          <p className="text-muted-foreground text-sm mt-2 text-center">
            Looks like you haven't added anything to your cart yet.
          </p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 my-6 max-h-[50vh]">
            <div className="space-y-1">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                  updateQuantity={updateQuantity}
                  removeItem={removeFromCart}
                />
              ))}
            </div>
          </ScrollArea>
          
          <Separator />
          
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout
            </p>
            
            <div className="flex flex-col gap-2">
              <Button className="w-full">
                Checkout
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" /> Clear Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </SheetContent>
  );
};

export default FloatingCart;
