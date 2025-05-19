
import React from "react";
import { Link } from "react-router-dom";
import { getCategories } from "@/services/productService";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import FloatingCart from "@/components/Cart";
import { useTheme } from "@/context/ThemeContext";

// Category card background images
const categoryImages: Record<string, string> = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  Clothing: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
  Accessories: "https://images.unsplash.com/photo-1556744543-cae514913d7c",
  Footwear: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  Home: "https://images.unsplash.com/photo-1517705008128-361805f42e86",
  Bags: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
};

const AllCategories: React.FC = () => {
  const categories = getCategories();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar 
        searchQuery="" 
        setSearchQuery={() => {}} 
        selectedCategory="All" 
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
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8">All Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category} 
              to={`/category/${category.toLowerCase()}`}
              className="transform transition-transform hover:scale-105"
            >
              <Card className="h-56 overflow-hidden relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0">
                  <img 
                    src={categoryImages[category] || "https://images.unsplash.com/photo-1590874103328-eac38a683ce7"} 
                    alt={category}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-black/40'}`}></div>
                </div>
                
                <CardContent className="relative z-10 flex items-center justify-center h-full text-white">
                  <h2 className="text-2xl font-bold">{category}</h2>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      
      <FloatingCart />
    </div>
  );
};

export default AllCategories;
