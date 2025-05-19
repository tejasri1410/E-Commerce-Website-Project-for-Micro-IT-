
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, ExternalLink, ShoppingCart } from "lucide-react";
import { useCart, Product } from "@/context/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isNew = false, isSale = false }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="card-hover glass-card overflow-hidden border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && <Badge className="bg-primary">New</Badge>}
          {isSale && <Badge className="bg-destructive">Sale</Badge>}
        </div>
        
        <div 
          className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? "auto" : "none",
          }}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="secondary" className="rounded-full animate-fade-in">
                <Eye className="h-4 w-4" />
                <span className="sr-only">Quick view</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-semibold">${product.price.toFixed(2)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      className="animate-fade-in" 
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="animate-fade-in" 
                      asChild
                    >
                      <Link to={`/product/${product.id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            size="icon" 
            className="rounded-full animate-fade-in"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
          
          <Button 
            size="icon" 
            variant="default"
            className="rounded-full animate-fade-in"
            asChild
          >
            <Link to={`/category/${product.category.toLowerCase()}`}>
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">View category</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{product.name}</h3>
        <p className="text-muted-foreground text-sm">{product.category}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="font-semibold">${product.price.toFixed(2)}</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs rounded-full hover:bg-primary hover:text-primary-foreground"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs rounded-full hover:bg-secondary hover:text-secondary-foreground"
            asChild
          >
            <Link to={`/product/${product.id}`}>View</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
