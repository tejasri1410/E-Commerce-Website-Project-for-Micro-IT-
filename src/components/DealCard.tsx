
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { hours: "00", minutes: "00", seconds: "00" };
    }
    
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    return {
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="bg-background/70 dark:bg-muted/30 rounded p-1 text-center min-w-8">
        <span className="font-mono">{timeLeft.hours}</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="bg-background/70 dark:bg-muted/30 rounded p-1 text-center min-w-8">
        <span className="font-mono">{timeLeft.minutes}</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="bg-background/70 dark:bg-muted/30 rounded p-1 text-center min-w-8">
        <span className="font-mono">{timeLeft.seconds}</span>
      </div>
    </div>
  );
};

interface DealCardProps {
  product: Product;
  discount: number;
  expiresAt: Date;
}

const DealCard: React.FC<DealCardProps> = ({ product, discount, expiresAt }) => {
  const { addToCart } = useCart();
  const discountedPrice = product.price * (1 - discount / 100);
  
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
      <div className="flex flex-col md:flex-row">
        <div className="aspect-square w-full md:w-1/2 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <CardContent className="flex flex-col justify-between p-6 w-full md:w-1/2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Badge className="bg-destructive">{discount}% OFF</Badge>
              <Countdown targetDate={expiresAt} />
            </div>
            
            <h3 className="text-xl font-semibold my-2">{product.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-semibold">${discountedPrice.toFixed(2)}</span>
              <span className="text-muted-foreground text-sm line-through">${product.price.toFixed(2)}</span>
            </div>
          </div>
          
          <Button onClick={() => addToCart(product)} className="w-full animate-pulse">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

export default DealCard;
