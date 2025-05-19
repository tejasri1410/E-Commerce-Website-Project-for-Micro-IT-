
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/services/productService";

interface ProductGridProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery = "", selectedCategory = "All" }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(ALL_PRODUCTS);

  // Filter products based on search query and category
  useEffect(() => {
    const results = ALL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory]);

  if (filteredProducts.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground">
        No products found matching your criteria.
      </div>
    );
  }

  return (
    <div className="card-grid">
      {filteredProducts.map((product, index) => (
        <div 
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard 
            product={product} 
            isNew={index === 0 || index === 3}
            isSale={product.stock !== undefined && product.stock < 5 && product.stock > 0}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
