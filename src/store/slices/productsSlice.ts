import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductsState } from "../../types";

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
