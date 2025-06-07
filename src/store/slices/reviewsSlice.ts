import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { Review, ReviewsState } from "../../types";

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
});

export const { addReview, addManyReviews, updateReview, removeReview } =
  reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;
export { reviewsAdapter };
