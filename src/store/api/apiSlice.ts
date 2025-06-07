import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";
import type {
  ApiProduct,
  ApiCategory,
  CreateProductRequest,
  UpdateProductRequest,
  CreateReviewRequest,
  NormalizedResponse,
} from "../../types/api";
import type { Category, Review, User } from "../../types";
import {
  normalizeProductsResponse,
  normalizeCategoriesResponse,
  normalizeProductResponse,
  normalizeReviewResponse,
} from "./normalizers";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product", "Category", "User", "Review"] as const,
  endpoints: (builder) => ({
    // Products endpoints
    getProducts: builder.query<NormalizedResponse, void>({
      query: () => "/products",
      transformResponse: (response: ApiProduct[]): NormalizedResponse =>
        normalizeProductsResponse(response),
      providesTags: (result) => [
        "Product",
        ...(result?.products || []).map(({ id }) => ({
          type: "Product" as const,
          id,
        })),
        ...(result?.categories || []).map(({ id }) => ({
          type: "Category" as const,
          id,
        })),
        ...(result?.users || []).map(({ id }) => ({
          type: "User" as const,
          id,
        })),
        ...(result?.reviews || []).map(({ id }) => ({
          type: "Review" as const,
          id,
        })),
      ],
    }),

    getProduct: builder.query<NormalizedResponse, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: ApiProduct): NormalizedResponse =>
        normalizeProductResponse(response),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation<NormalizedResponse, CreateProductRequest>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      transformResponse: (response: ApiProduct): NormalizedResponse =>
        normalizeProductResponse(response),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<NormalizedResponse, UpdateProductRequest>({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      transformResponse: (response: ApiProduct): NormalizedResponse =>
        normalizeProductResponse(response),
      // Optimistic update
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
            const product = draft.products.find((p) => p.id === id);
            if (product) {
              Object.assign(product, patch);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Categories endpoints
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      transformResponse: (response: ApiCategory[]): Category[] =>
        normalizeCategoriesResponse(response),
      providesTags: (result) => [
        "Category",
        ...(result || []).map(({ id }) => ({ type: "Category" as const, id })),
      ],
    }),

    // Reviews endpoints
    createReview: builder.mutation<NormalizedResponse, CreateReviewRequest>({
      query: ({ productId, ...reviewData }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
      transformResponse: (response: {
        review: Review & { author: User };
      }): NormalizedResponse => normalizeReviewResponse(response.review),
      // Update the products cache to include new review
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const newReview = data.reviews[0];

          if (newReview) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProducts",
                undefined,
                (draft) => {
                  const product = draft.products.find(
                    (p) => p.id === productId
                  );
                  if (product) {
                    product.reviewIds.push(newReview.id);
                  }
                }
              )
            );
          }
        } catch {
          // Ignore errors - this is for optimistic updates
        }
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
        "Review",
      ],
    }),

    // Search endpoint
    searchProducts: builder.query<NormalizedResponse, string>({
      query: (searchTerm) =>
        `/products/search?q=${encodeURIComponent(searchTerm)}`,
      transformResponse: (response: ApiProduct[]): NormalizedResponse =>
        normalizeProductsResponse(response),
      providesTags: ["Product"],
    }),

    // Products by category
    getProductsByCategory: builder.query<NormalizedResponse, number>({
      query: (categoryId) => `/categories/${categoryId}/products`,
      transformResponse: (response: ApiProduct[]): NormalizedResponse =>
        normalizeProductsResponse(response),
      providesTags: (result, error, categoryId) => [
        { type: "Category", id: categoryId },
        "Product",
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useCreateReviewMutation,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} = apiSlice;
