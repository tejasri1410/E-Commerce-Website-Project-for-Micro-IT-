
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/services/productService";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingCart from "@/components/Cart";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (categoryName) {
      const categoryProducts = getProductsByCategory(categoryName);
      setProducts(categoryProducts);
      setLoading(false);
    }
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  const formattedCategoryName = categoryName 
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) 
    : "";

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar 
        searchQuery="" 
        setSearchQuery={() => {}} 
        selectedCategory={formattedCategoryName} 
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
              <BreadcrumbPage>{formattedCategoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{formattedCategoryName}</h1>
          <Button variant="outline" asChild>
            <Link to="/categories">
              All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {products.length > 0 ? (
          <div className="card-grid">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard 
                  product={product} 
                  isNew={index === 0} 
                  isSale={product.stock !== undefined && product.stock < 5 && product.stock > 0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No products found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products in the {formattedCategoryName} category.
            </p>
            <Button asChild>
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        )}
      </main>
      
      <FloatingCart />
    </div>
  );
};

export default CategoryPage;
