
import React, { useState } from "react";
import { useWelcomeMessage } from "@/hooks/useWelcomeMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import FloatingCart from "@/components/Cart";
import DealCard from "@/components/DealCard";
import TestimonialCard from "@/components/TestimonialCard";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider, Product } from "@/context/CartContext";

// Mock deals
const DEALS: Array<{
  product: Product;
  discount: number;
  expiresAt: Date;
}> = [
  {
    product: {
      id: "deal1",
      name: "Premium Wireless Earbuds",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      category: "Electronics",
      description: "True wireless earbuds with active noise cancellation and 8-hour battery life."
    },
    discount: 30,
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
  },
  {
    product: {
      id: "deal2",
      name: "Leather Travel Bag",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      category: "Bags",
      description: "Handcrafted leather travel bag with multiple compartments and premium finish."
    },
    discount: 25,
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day from now
  }
];

// Mock testimonials
const TESTIMONIALS = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "Verified Buyer",
    content: "The product quality exceeded my expectations! Fast shipping and excellent customer service.",
    rating: 5
  },
  {
    id: "2",
    name: "Samantha Lee",
    avatar: "https://i.pravatar.cc/150?img=25",
    role: "Verified Buyer",
    content: "I've ordered multiple times from this store and have never been disappointed. Highly recommend!",
    rating: 5
  },
  {
    id: "3",
    name: "Michael Roberts",
    avatar: "https://i.pravatar.cc/150?img=53",
    role: "Verified Buyer",
    content: "Great selection of products at competitive prices. The website is also very easy to navigate.",
    rating: 4
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=44",
    role: "Verified Buyer",
    content: "Outstanding customer service! Had an issue with my order and they resolved it immediately.",
    rating: 5
  }
];

// Recommended Products
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: "rec1",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Electronics",
    description: "Waterproof portable speaker with 360° sound and 20-hour battery life."
  },
  {
    id: "rec2",
    name: "Oversized Sweater",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    category: "Clothing",
    description: "Comfortable oversized sweater perfect for layering in cold weather."
  },
  {
    id: "rec3",
    name: "Smart Fitness Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    category: "Electronics",
    description: "Advanced fitness tracker with heart rate monitoring and sleep analysis."
  }
];

const Index: React.FC = () => {
  const welcomeMessage = useWelcomeMessage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen gradient-bg">
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <main className="container mx-auto px-4 py-8">
            {/* Hero section with welcome message */}
            <section className="mb-12 mt-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                  {welcomeMessage}, Welcome to ChromaShop
                </h1>
                <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  Discover our curated collection of premium products designed to enhance your lifestyle.
                </p>
              </div>
            </section>

            {/* Deals of the day */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Deals of the Day</h2>
                <a href="#" className="text-primary hover:underline text-sm">View all</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEALS.map((deal, index) => (
                  <div 
                    key={deal.product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <DealCard 
                      product={deal.product} 
                      discount={deal.discount} 
                      expiresAt={deal.expiresAt} 
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Featured products */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Products</h2>
                <a href="#" className="text-primary hover:underline text-sm">View all</a>
              </div>

              <ProductGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
            </section>

            {/* Testimonials */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">What Our Customers Say</h2>

              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-6 py-4">
                  {TESTIMONIALS.map((testimonial, index) => (
                    <div key={testimonial.id} className="w-80 shrink-0">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </section>

            {/* Recommended for you */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {RECOMMENDED_PRODUCTS.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <DealCard 
                      product={product} 
                      discount={0} 
                      expiresAt={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} 
                    />
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-secondary dark:bg-muted/20 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">ChromaShop</h3>
                  <p className="text-muted-foreground text-sm">
                    Your destination for quality products with an exceptional shopping experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Shop All</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">About Us</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">Contact</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm">FAQ</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Subscribe to get special offers and updates.
                  </p>
                  <form className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                    <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} ChromaShop. All rights reserved.</p>
              </div>
            </div>
          </footer>

          <FloatingCart />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default Index;
