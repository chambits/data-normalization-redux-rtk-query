import type { Category, User, Review, Product } from "../types";

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and devices",
    icon: "💻",
  },
  {
    id: 2,
    name: "Books",
    description: "Knowledge and entertainment",
    icon: "📚",
  },
  { id: 3, name: "Clothing", description: "Fashion and style", icon: "👕" },
  {
    id: 4,
    name: "Home & Garden",
    description: "Everything for your home",
    icon: "🏠",
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Johnson&background=ec4899&color=ffffff&size=100",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Mike+Chen&background=3b82f6&color=ffffff&size=100",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Emily+Davis&background=10b981&color=ffffff&size=100",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Rodriguez&background=f59e0b&color=ffffff&size=100",
  },
];

export const mockReviews: Review[] = [
  {
    id: 1,
    text: "Amazing performance and sleek design! Perfect for gaming and work.",
    rating: 5,
    authorId: 1,
    productId: 1,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    text: "Great value for money. Highly recommend!",
    rating: 4,
    authorId: 2,
    productId: 1,
    createdAt: "2024-01-10T14:20:00Z",
  },
  {
    id: 3,
    text: "Incredible sound quality and comfortable to wear for hours.",
    rating: 5,
    authorId: 3,
    productId: 2,
    createdAt: "2024-01-12T09:15:00Z",
  },
  {
    id: 4,
    text: "Life-changing book! Changed my perspective completely.",
    rating: 5,
    authorId: 4,
    productId: 3,
    createdAt: "2024-01-08T16:45:00Z",
  },
  {
    id: 5,
    text: "Good quality, fast delivery. Will buy again.",
    rating: 4,
    authorId: 1,
    productId: 4,
    createdAt: "2024-01-05T11:30:00Z",
  },
  {
    id: 6,
    text: "Stylish and comfortable. Perfect fit!",
    rating: 4,
    authorId: 2,
    productId: 4,
    createdAt: "2024-01-03T13:20:00Z",
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop Pro",
    price: 1299.99,
    description:
      "High-performance gaming laptop with RTX 4060, 16GB RAM, and 1TB SSD. Perfect for gaming and professional work.",
    categoryId: 1,
    reviewIds: [1, 2],
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&q=80",
    inStock: true,
  },
  {
    id: 2,
    name: "Wireless Pro Headphones",
    price: 249.99,
    description:
      "Premium noise-canceling wireless headphones with 30-hour battery life and crystal-clear audio quality.",
    categoryId: 1,
    reviewIds: [3],
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80",
    inStock: true,
  },
  {
    id: 3,
    name: "The Art of Clean Code",
    price: 39.99,
    description:
      "Master the craft of writing clean, maintainable code with practical examples and proven techniques.",
    categoryId: 2,
    reviewIds: [4],
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&q=80",
    inStock: true,
  },
  {
    id: 4,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    description:
      "Soft, comfortable 100% organic cotton t-shirt. Available in multiple colors and sizes.",
    categoryId: 3,
    reviewIds: [5, 6],
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&q=80",
    inStock: true,
  },
  {
    id: 5,
    name: "Smart Home Hub",
    price: 149.99,
    description:
      "Control all your smart devices from one central hub. Voice control and app integration included.",
    categoryId: 4,
    reviewIds: [],
    imageUrl:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&q=80",
    inStock: false,
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 129.99,
    description:
      "RGB backlit mechanical keyboard with tactile switches. Perfect for gaming and typing.",
    categoryId: 1,
    reviewIds: [],
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop&q=80",
    inStock: true,
  },
];
