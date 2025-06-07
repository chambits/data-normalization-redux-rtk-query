import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { productsReducer } from "./slices/productsSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { usersReducer } from "./slices/usersSlice";
import { reviewsReducer } from "./slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    // RTK Query reducer
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Entity slices for normalized data
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
