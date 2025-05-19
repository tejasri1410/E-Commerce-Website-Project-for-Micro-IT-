
import { Product } from "@/context/CartContext";

export const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Accessories",
    description: "Elegant minimalist watch with leather strap and premium materials.",
    stock: 12
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    stock: 8
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "Clothing",
    description: "Comfortable cotton t-shirt with modern cut and premium fabric.",
    stock: 25
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    category: "Accessories",
    description: "Stylish sunglasses with 100% UV protection and polarized lenses.",
    stock: 4
  },
  {
    id: "5",
    name: "Leather Backpack",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    category: "Bags",
    description: "Durable leather backpack with multiple compartments and water-resistant finish.",
    stock: 6
  },
  {
    id: "6",
    name: "Smart Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    category: "Electronics",
    description: "Voice-controlled smart speaker with premium sound quality and virtual assistant.",
    stock: 15
  },
  {
    id: "7",
    name: "Running Shoes",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Footwear",
    description: "Lightweight running shoes with responsive cushioning and breathable upper.",
    stock: 3
  },
  {
    id: "8",
    name: "Ceramic Mug Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    category: "Home",
    description: "Set of 4 handcrafted ceramic mugs in modern colors and sleek design.",
    stock: 9
  },
  {
    id: "9",
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
    category: "Electronics",
    description: "Tactile mechanical keyboard with RGB lighting and programmable keys.",
    stock: 7
  },
  {
    id: "10",
    name: "Wool Sweater",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
    category: "Clothing",
    description: "Warm wool sweater perfect for cold days, available in multiple colors.",
    stock: 0
  },
  {
    id: "11",
    name: "Smart Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    category: "Electronics",
    description: "Advanced smartwatch with health monitoring and smartphone connectivity.",
    stock: 2
  },
  {
    id: "12",
    name: "Canvas Tote Bag",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6",
    category: "Bags",
    description: "Durable canvas tote with ample space for everyday essentials.",
    stock: 18
  }
];

export const getCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  ALL_PRODUCTS.forEach(product => categoriesSet.add(product.category));
  return Array.from(categoriesSet);
};

export const getProductsByCategory = (category: string): Product[] => {
  return ALL_PRODUCTS.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id: string): Product | undefined => {
  return ALL_PRODUCTS.find(product => product.id === id);
};

export const getStockStatus = (stock: number): { text: string; color: string } => {
  if (stock === 0) {
    return { text: "Out of Stock", color: "destructive" };
  } else if (stock < 5) {
    return { text: `Low Stock: Only ${stock} left`, color: "warning" };
  } else {
    return { text: "In Stock", color: "success" };
  }
};
