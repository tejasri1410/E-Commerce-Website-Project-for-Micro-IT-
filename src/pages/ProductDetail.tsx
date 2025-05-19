
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product, useCart } from "@/context/CartContext";
import { getProductById, getStockStatus, ColorVariant, ProductWithVariants } from "@/services/productService";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingCart from "@/components/Cart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductWithVariants | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const { addToCart } = useCart();
  const [imageTransition, setImageTransition] = useState<boolean>(false);

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [productId]);

  const handleColorChange = (index: number) => {
    if (index === selectedColorIndex) return;
    
    // Trigger fade out
    setImageTransition(true);
    
    setTimeout(() => {
      // Update color after fade out
      setSelectedColorIndex(index);
      
      // Trigger fade in
      setImageTransition(false);
    }, 200);
  };

  const getCurrentVariant = (): ColorVariant | null => {
    if (!product?.colors || product.colors.length === 0) return null;
    return product.colors[selectedColorIndex];
  };

  const getCurrentStock = (): number => {
    const variant = getCurrentVariant();
    if (variant) return variant.stock;
    return product?.stock || 0;
  };

  const getCurrentImage = (): string => {
    const variant = getCurrentVariant();
    if (variant) return variant.image;
    return product?.image || "";
  };

  const handleAddToCart = () => {
    if (product) {
      const currentVariant = getCurrentVariant();
      
      const productToAdd: Product = {
        ...product,
        stock: getCurrentStock(),
        image: getCurrentImage(),
        // Add selected color to the product name if there is a color variant
        name: currentVariant 
          ? `${product.name} - ${currentVariant.name}` 
          : product.name
      };
      
      addToCart(productToAdd);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentStock = getCurrentStock();
  const stockStatus = getStockStatus(currentStock);
  const isOutOfStock = currentStock === 0;
  const hasColorVariants = product.colors && product.colors.length > 1;

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar 
        searchQuery="" 
        setSearchQuery={() => {}} 
        selectedCategory={product.category} 
        setSelectedCategory={() => {}}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/categories">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${product.category.toLowerCase()}`}>
                  {product.category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg">
              <div className={`transition-opacity duration-200 ${imageTransition ? "opacity-0" : "opacity-100"}`}>
                <img 
                  src={getCurrentImage()}
                  alt={`${product.name} ${getCurrentVariant()?.name || ""}`}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              
              {currentStock !== undefined && currentStock < 5 && currentStock > 0 && (
                <Badge 
                  className="absolute top-4 left-4 px-3 py-1.5 text-sm bg-yellow-600"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Low Stock: Only {currentStock} left
                </Badge>
              )}
              
              {currentStock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge 
                    className="px-4 py-2 text-lg bg-destructive"
                  >
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <p className="text-muted-foreground mb-2">
                Category: <Link to={`/category/${product.category.toLowerCase()}`} className="text-primary hover:underline">{product.category}</Link>
              </p>
              
              <div className="mb-4">
                <Badge 
                  variant={stockStatus.color === "success" 
                    ? "default" 
                    : stockStatus.color === "warning" 
                      ? "outline" 
                      : "destructive"}
                  className={`${stockStatus.color === "warning" ? "border-yellow-500 text-yellow-500" : ""}`}
                >
                  {stockStatus.text}
                </Badge>
              </div>
              
              {hasColorVariants && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Color Options</h3>
                  
                  <RadioGroup 
                    defaultValue={product.colors![0].name} 
                    className="flex flex-wrap gap-3"
                    onValueChange={(value) => {
                      const index = product.colors!.findIndex(c => c.name === value);
                      if (index !== -1) handleColorChange(index);
                    }}
                  >
                    {product.colors!.map((color, index) => (
                      <div key={color.name} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={color.name} 
                          id={`color-${color.name}`}
                          disabled={color.stock === 0}
                        />
                        <Label 
                          htmlFor={`color-${color.name}`}
                          className={`cursor-pointer ${color.stock === 0 ? 'text-gray-400' : ''}`}
                        >
                          {color.name} 
                          {color.stock === 0 && " (Out of Stock)"} 
                          {color.stock > 0 && color.stock < 5 && ` (Only ${color.stock} left)`}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              <p className="text-3xl font-bold mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-auto space-y-4">
                <Button 
                  className="w-full" 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full" 
                  onClick={() => {
                    handleAddToCart();
                    // Navigate to checkout (could be implemented later)
                  }}
                  disabled={isOutOfStock}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      <FloatingCart />
    </div>
  );
};

export default ProductDetail;
