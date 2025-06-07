import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductsState } from "../../types";
import { apiSlice } from "../api/apiSlice";

const productsAdapter = createEntityAdapter<Product>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({
    loadingStatus: "idle" as const,
    error: null as string | null,
    selectedCategoryId: null as number | null,
  }) as ProductsState,
  reducers: {
    // Keep manual operations for local state management
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },

    // Local optimistic updates (can be used alongside RTK Query)
    optimisticUpdateProduct: (
      state,
      action: PayloadAction<{ id: number; changes: Partial<Product> }>
    ) => {
      const { id, changes } = action.payload;
      const existing = state.entities[id];
      if (existing) {
        productsAdapter.updateOne(state, { id, changes });
      }
    },

    // Manual operations for edge cases
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
  extraReducers: (builder) => {
    builder
      // Sync with RTK Query results - getProducts
      .addMatcher(
        apiSlice.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          productsAdapter.setAll(state, action.payload.products);
          state.loadingStatus = "succeeded";
          state.error = null;
        }
      )
      .addMatcher(apiSlice.endpoints.getProducts.matchPending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addMatcher(
        apiSlice.endpoints.getProducts.matchRejected,
        (state, action) => {
          state.loadingStatus = "failed";
          state.error = action.error.message || "Failed to load products";
        }
      )
      // Sync with RTK Query results - getProduct
      .addMatcher(
        apiSlice.endpoints.getProduct.matchFulfilled,
        (state, action) => {
          productsAdapter.upsertMany(state, action.payload.products);
        }
      )
      // Sync with RTK Query results - createProduct
      .addMatcher(
        apiSlice.endpoints.createProduct.matchFulfilled,
        (state, action) => {
          productsAdapter.addMany(state, action.payload.products);
        }
      )
      // Sync with RTK Query results - updateProduct
      .addMatcher(
        apiSlice.endpoints.updateProduct.matchFulfilled,
        (state, action) => {
          productsAdapter.upsertMany(state, action.payload.products);
        }
      )
      // Handle deleteProduct
      .addMatcher(
        apiSlice.endpoints.deleteProduct.matchFulfilled,
        (state, action) => {
          // The ID comes from the original args
          const id = action.meta.arg.originalArgs;
          productsAdapter.removeOne(state, id);
        }
      );
  },
});

export const {
  setSelectedCategory,
  optimisticUpdateProduct,
  addReviewToProduct,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
export { productsAdapter };
