import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { Review, ReviewsState } from "../../types";
import { apiSlice } from "../api/apiSlice";

const reviewsAdapter = createEntityAdapter<Review>({
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: reviewsAdapter.getInitialState() as ReviewsState,
  reducers: {
    addReview: reviewsAdapter.addOne,
    addManyReviews: reviewsAdapter.addMany,
    updateReview: reviewsAdapter.updateOne,
    removeReview: reviewsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      // Sync with RTK Query results - from products query
      .addMatcher(
        apiSlice.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          if (action.payload.reviews) {
            reviewsAdapter.upsertMany(state, action.payload.reviews);
          }
        }
      )
      // Sync with RTK Query results - from single product query
      .addMatcher(
        apiSlice.endpoints.getProduct.matchFulfilled,
        (state, action) => {
          if (action.payload.reviews) {
            reviewsAdapter.upsertMany(state, action.payload.reviews);
          }
        }
      )
      // Sync with RTK Query results - from createReview
      .addMatcher(
        apiSlice.endpoints.createReview.matchFulfilled,
        (state, action) => {
          if (action.payload.reviews) {
            reviewsAdapter.addMany(state, action.payload.reviews);
          }
        }
      );
  },
});

export const { addReview, addManyReviews, updateReview, removeReview } =
  reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;
export { reviewsAdapter };
