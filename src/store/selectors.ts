import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { ProductWithDetails } from "../types";
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
