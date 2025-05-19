
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product, useCart } from "@/context/CartContext";
import { getProductById, getStockStatus } from "@/services/productService";
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

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [productId]);

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

  const stockStatus = product.stock !== undefined 
    ? getStockStatus(product.stock)
    : { text: "In Stock", color: "success" };

  const isOutOfStock = product.stock === 0;

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
              <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={`/category/${product.category.toLowerCase()}`}>
                {product.category}
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
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-square"
              />
              
              {product.stock !== undefined && product.stock < 5 && product.stock > 0 && (
                <Badge 
                  className="absolute top-4 left-4 px-3 py-1.5 text-sm bg-yellow-600"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Low Stock: Only {product.stock} left
                </Badge>
              )}
              
              {product.stock === 0 && (
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
                  onClick={() => addToCart(product)}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full" 
                  onClick={() => {
                    addToCart(product);
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
