export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    description?: string;
    icon?: string;
  };
  reviews: Array<{
    id: number;
    text: string;
    rating: number;
    createdAt: string;
    author: {
      id: number;
      name: string;
      email: string;
      avatar?: string;
    };
  }>;
  imageUrl?: string;
  inStock: boolean;
}

export interface ApiCategory {
  id: number | string; // JSON Server may return string IDs
  name: string;
  description?: string;
  icon?: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  imageUrl?: string;
  inStock: boolean;
}

export interface UpdateProductRequest {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  imageUrl?: string;
  inStock?: boolean;
}

export interface CreateReviewRequest {
  productId: number;
  text: string;
  rating: number;
  authorId: number;
}

// Normalized response type for RTK Query transformResponse
export interface NormalizedResponse {
  products: Array<import("./index").Product>;
  categories: Array<import("./index").Category>;
  users: Array<import("./index").User>;
  reviews: Array<import("./index").Review>;
}

// API Error response
export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}
