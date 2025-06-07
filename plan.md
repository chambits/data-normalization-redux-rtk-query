# React Vite E-commerce Project with Data Normalization

This is a complete React Vite project implementing the data normalization patterns from the article.

## Project Structure

```
src/
├── components/          # React components
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── hooks/              # Custom hooks
├── data/               # Mock data
└── App.tsx             # Main app component
```

## Installation & Setup

```bash
npm install @reduxjs/toolkit react-redux @types/react-redux
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
npm run dev
```

## Key Files

### package.json

```json
{
  "name": "ecommerce-normalized-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.0.4",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/react-redux": "^7.1.33",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .card {
    @apply bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300;
  }

  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }

  .btn-secondary {
    @apply bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }

  .gradient-bg {
    @apply bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50;
  }
}

.star-rating {
  color: #fbbf24;
}
```

### src/types/index.ts

```typescript
import { EntityState } from "@reduxjs/toolkit";

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
export interface ProductsState extends EntityState<Product> {
  loadingStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedCategoryId: number | null;
}

export interface CategoriesState extends EntityState<Category> {}
export interface UsersState extends EntityState<User> {}
export interface ReviewsState extends EntityState<Review> {}

// Combined types for components
export interface ProductWithDetails
  extends Omit<Product, "categoryId" | "reviewIds"> {
  category: Category | undefined;
  reviews: Array<Review & { author: User | undefined }>;
}
```

### src/store/slices/productsSlice.ts

```typescript
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../types";

const productsAdapter = createEntityAdapter<Product>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState<ProductsState>({
    loadingStatus: "idle",
    error: null,
    selectedCategoryId: null,
  }),
  reducers: {
    addProduct: productsAdapter.addOne,
    addManyProducts: productsAdapter.addMany,
    updateProduct: productsAdapter.updateOne,
    removeProduct: (state, action: PayloadAction<number>) => {
      productsAdapter.removeOne(state, action.payload);
    },
    clearProducts: productsAdapter.removeAll,

    setLoadingStatus: (
      state,
      action: PayloadAction<ProductsState["loadingStatus"]>
    ) => {
      state.loadingStatus = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },

    addReviewToProduct: (
      state,
      action: PayloadAction<{ productId: number; reviewId: number }>
    ) => {
      const { productId, reviewId } = action.payload;
      const product = state.entities[productId];
      if (product && !product.reviewIds.includes(reviewId)) {
        product.reviewIds.push(reviewId);
      }
    },
  },
});

export const {
  addProduct,
  addManyProducts,
  updateProduct,
  removeProduct,
  clearProducts,
  setLoadingStatus,
  setError,
  setSelectedCategory,
  addReviewToProduct,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
export { productsAdapter };
```

### src/store/slices/categoriesSlice.ts

```typescript
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { Category, CategoriesState } from "../../types";

const categoriesAdapter = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState<CategoriesState>(),
  reducers: {
    addCategory: categoriesAdapter.addOne,
    addManyCategories: categoriesAdapter.addMany,
    updateCategory: categoriesAdapter.updateOne,
    removeCategory: categoriesAdapter.removeOne,
  },
});

export const {
  addCategory,
  addManyCategories,
  updateCategory,
  removeCategory,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
export { categoriesAdapter };
```

### src/store/slices/usersSlice.ts

```typescript
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { User, UsersState } from "../../types";

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState<UsersState>(),
  reducers: {
    addUser: usersAdapter.addOne,
    addManyUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
  },
});

export const { addUser, addManyUsers, updateUser, removeUser } =
  usersSlice.actions;

export const usersReducer = usersSlice.reducer;
export { usersAdapter };
```

### src/store/slices/reviewsSlice.ts

```typescript
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { Review, ReviewsState } from "../../types";

const reviewsAdapter = createEntityAdapter<Review>({
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: reviewsAdapter.getInitialState<ReviewsState>(),
  reducers: {
    addReview: reviewsAdapter.addOne,
    addManyReviews: reviewsAdapter.addMany,
    updateReview: reviewsAdapter.updateOne,
    removeReview: reviewsAdapter.removeOne,
  },
});

export const { addReview, addManyReviews, updateReview, removeReview } =
  reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;
export { reviewsAdapter };
```

### src/store/selectors.ts

```typescript
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ProductWithDetails } from "../types";
import {
  productsAdapter,
  categoriesAdapter,
  usersAdapter,
  reviewsAdapter,
} from "./slices";

// Basic selectors
const selectProductsState = (state: RootState) => state.products;
const selectCategoriesState = (state: RootState) => state.categories;
const selectUsersState = (state: RootState) => state.users;
const selectReviewsState = (state: RootState) => state.reviews;

// Generated selectors from adapters
export const productsSelectors =
  productsAdapter.getSelectors(selectProductsState);
export const categoriesSelectors = categoriesAdapter.getSelectors(
  selectCategoriesState
);
export const usersSelectors = usersAdapter.getSelectors(selectUsersState);
export const reviewsSelectors = reviewsAdapter.getSelectors(selectReviewsState);

// Loading state selectors
export const selectProductsLoadingStatus = createSelector(
  [selectProductsState],
  (productsState) => productsState.loadingStatus
);

export const selectProductsError = createSelector(
  [selectProductsState],
  (productsState) => productsState.error
);

export const selectSelectedCategoryId = createSelector(
  [selectProductsState],
  (productsState) => productsState.selectedCategoryId
);

// Complex selector that combines entities
export const selectProductWithDetails = createSelector(
  [
    (state: RootState, productId: number) =>
      productsSelectors.selectById(state, productId),
    categoriesSelectors.selectEntities,
    reviewsSelectors.selectEntities,
    usersSelectors.selectEntities,
  ],
  (product, categories, reviews, users): ProductWithDetails | null => {
    if (!product) return null;

    return {
      ...product,
      category: categories[product.categoryId],
      reviews: product.reviewIds
        .map((reviewId) => {
          const review = reviews[reviewId];
          if (!review) return null;

          return {
            ...review,
            author: users[review.authorId],
          };
        })
        .filter(
          (review): review is NonNullable<typeof review> => review !== null
        ),
    };
  }
);

// Selector for products by category
export const selectProductsByCategory = createSelector(
  [productsSelectors.selectAll, selectSelectedCategoryId],
  (products, selectedCategoryId) => {
    if (selectedCategoryId === null) return products;
    return products.filter(
      (product) => product.categoryId === selectedCategoryId
    );
  }
);

// Selector for products with their categories
export const selectProductsWithCategories = createSelector(
  [productsSelectors.selectAll, categoriesSelectors.selectEntities],
  (products, categories) =>
    products.map((product) => ({
      ...product,
      category: categories[product.categoryId],
    }))
);
```

### src/store/store.ts

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { usersReducer } from "./slices/usersSlice";
import { reviewsReducer } from "./slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### src/hooks/index.ts

```typescript
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  selectProductWithDetails,
  selectProductsByCategory,
} from "../store/selectors";

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for common operations
export const useProduct = (productId: number) => {
  return useAppSelector((state) => selectProductWithDetails(state, productId));
};

export const useProductsByCategory = () => {
  return useAppSelector(selectProductsByCategory);
};
```

### src/data/mockData.ts

```typescript
import { Category, User, Review, Product } from "../types";

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
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
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
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    inStock: true,
  },
];
```

### src/components/CategoryFilter.tsx

```tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSelectedCategory } from "../store/slices/productsSlice";
import {
  categoriesSelectors,
  selectSelectedCategoryId,
} from "../store/selectors";

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesSelectors.selectAll);
  const selectedCategoryId = useAppSelector(selectSelectedCategoryId);

  const handleCategoryChange = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategoryId === null
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedCategoryId === category.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
```

### src/components/ProductCard.tsx

```tsx
import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useProduct } from "../hooks";

interface ProductCardProps {
  productId: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  const product = useProduct(productId);

  if (!product) return null;

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  return (
    <div className="card animate-fade-in hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {product.category?.icon} {product.category?.name}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews.length} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>

          <button
            disabled={!product.inStock}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              product.inStock
                ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
```

### src/components/ProductDetail.tsx

```tsx
import React from "react";
import { Star, User, Calendar, ArrowLeft } from "lucide-react";
import { useProduct } from "../hooks";

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
  const product = useProduct(productId);

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Product not found</p>
        <button onClick={onBack} className="btn-primary mt-4">
          Back to Products
        </button>
      </div>
    );
  }

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  return (
    <div className="animate-slide-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              {product.category?.icon} {product.category?.name}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {averageRating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <button
            disabled={!product.inStock}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              product.inStock
                ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="card">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        review.author?.avatar ||
                        `https://ui-avatars.com/api/?name=${review.author?.name}&background=f3f4f6&color=374151`
                      }
                      alt={review.author?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {review.author?.name || "Anonymous"}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
```

### src/components/ProductGrid.tsx

```tsx
import React from "react";
import { useProductsByCategory, useAppSelector } from "../hooks";
import {
  selectProductsLoadingStatus,
  selectProductsError,
} from "../store/selectors";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

interface ProductGridProps {
  onProductClick: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const products = useProductsByCategory();
  const loadingStatus = useAppSelector(selectProductsLoadingStatus);
  const error = useAppSelector(selectProductsError);

  if (loadingStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛍️</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600">
          Try selecting a different category or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onProductClick(product.id)}
          className="cursor-pointer"
        >
          <ProductCard productId={product.id} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
```

### src/components/LoadingSpinner.tsx

```tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
```

### src/components/Header.tsx

```tsx
import React from "react";
import { ShoppingBag, Search, User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">NormalizedStore</h1>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### src/components/Stats.tsx

```tsx
import React from "react";
import { useAppSelector } from "../hooks";
import {
  productsSelectors,
  categoriesSelectors,
  reviewsSelectors,
} from "../store/selectors";
import { Package, Tag, Star, Users } from "lucide-react";

const Stats: React.FC = () => {
  const products = useAppSelector(productsSelectors.selectAll);
  const categories = useAppSelector(categoriesSelectors.selectAll);
  const reviews = useAppSelector(reviewsSelectors.selectAll);

  const inStockProducts = products.filter((p) => p.inStock).length;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "blue",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Tag,
      color: "green",
    },
    {
      label: "In Stock",
      value: inStockProducts,
      icon: Package,
      color: "emerald",
    },
    {
      label: "Avg Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
```

### src/App.tsx

```tsx
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppDispatch } from "./hooks";
import {
  addManyProducts,
  addManyCategories,
  addManyUsers,
  addManyReviews,
  setLoadingStatus,
} from "./store/slices";
import {
  mockCategories,
  mockUsers,
  mockReviews,
  mockProducts,
} from "./data/mockData";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import Stats from "./components/Stats";

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Simulate loading data
    dispatch(setLoadingStatus("loading"));

    setTimeout(() => {
      // Load mock data into normalized state
      dispatch(addManyCategories(mockCategories));
      dispatch(addManyUsers(mockUsers));
      dispatch(addManyReviews(mockReviews));
      dispatch(addManyProducts(mockProducts));
      dispatch(setLoadingStatus("succeeded"));
    }, 1000);
  }, [dispatch]);

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProductId ? (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToProducts}
          />
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to NormalizedStore
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the power of normalized data in React. Browse our
                products with lightning-fast updates and consistent state
                management.
              </p>
            </div>

            <Stats />
            <CategoryFilter />
            <ProductGrid onProductClick={handleProductClick} />
          </>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
```

### src/main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NormalizedStore - Data Normalization Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

## Running the Project

1. **Install dependencies:**

```bash
npm install
```

2. **Start development server:**

```bash
npm run dev
```

3. **Build for production:**

```bash
npm run build
```

## Key Features Implemented

### ✅ **Complete Data Normalization**

- Separate entity adapters for Products, Categories, Users, and Reviews
- Normalized state structure with references between entities
- Type-safe selectors for combining related data

### ✅ **Modern UI with Tailwind CSS**

- Responsive design that works on all devices
- Beautiful animations and hover effects
- Modern gradient backgrounds and glassmorphism effects
- Accessible color schemes and typography

### ✅ **Performance Optimizations**

- Memoized selectors prevent unnecessary re-renders
- Component-level optimization with proper key props
- Efficient updates using entity adapters

### ✅ **Real-world Features**

- Category filtering with visual feedback
- Product detail view with reviews and ratings
- Loading states and error handling
- Mock data that demonstrates relationships

### ✅ **Developer Experience**

- Full TypeScript support with strict typing
- Custom hooks for common operations
- Clear project structure and separation of concerns
- Comprehensive comments and documentation

This project demonstrates the exact normalized data patterns from the article while providing a beautiful, functional e-commerce interface. The state management showcases how normalization improves performance and maintainability in real-world applications.
