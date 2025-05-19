
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/context/CartContext";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Accessories",
    description: "Elegant minimalist watch with leather strap and premium materials."
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life."
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "Clothing",
    description: "Comfortable cotton t-shirt with modern cut and premium fabric."
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    category: "Accessories",
    description: "Stylish sunglasses with 100% UV protection and polarized lenses."
  },
  {
    id: "5",
    name: "Leather Backpack",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    category: "Bags",
    description: "Durable leather backpack with multiple compartments and water-resistant finish."
  },
  {
    id: "6",
    name: "Smart Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    category: "Electronics",
    description: "Voice-controlled smart speaker with premium sound quality and virtual assistant."
  },
  {
    id: "7",
    name: "Running Shoes",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Footwear",
    description: "Lightweight running shoes with responsive cushioning and breathable upper."
  },
  {
    id: "8",
    name: "Ceramic Mug Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    category: "Home",
    description: "Set of 4 handcrafted ceramic mugs in modern colors and sleek design."
  }
];

interface ProductGridProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery = "", selectedCategory = "All" }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Filter products based on search query and category
  useEffect(() => {
    const results = MOCK_PRODUCTS.filter(product => {
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
            isSale={index === 1 || index === 6}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
