import type { EntityState } from "@reduxjs/toolkit";

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: number;
  text: string;
  rating: number;
  authorId: number;
  productId: number;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  reviewIds: number[];
  imageUrl?: string;
  inStock: boolean;
}

// State interfaces
export interface ProductsState extends EntityState<Product, number> {
  loadingStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedCategoryId: number | null;
}

export type CategoriesState = EntityState<Category, number>;
export type UsersState = EntityState<User, number>;
export type ReviewsState = EntityState<Review, number>;

// Combined types for components
export interface ProductWithDetails
  extends Omit<Product, "categoryId" | "reviewIds"> {
  category: Category | undefined;
  reviews: Array<Review & { author: User | undefined }>;
}
