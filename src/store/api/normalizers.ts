import type {
  ApiProduct,
  ApiCategory,
  NormalizedResponse,
} from "../../types/api";
import type { Product, Category, User, Review } from "../../types";

export function normalizeProductsResponse(
  products: ApiProduct[]
): NormalizedResponse {
  const normalized: {
    products: Record<number, Product>;
    categories: Record<number, Category>;
    users: Record<number, User>;
    reviews: Record<number, Review>;
  } = {
    products: {},
    categories: {},
    users: {},
    reviews: {},
  };

  products.forEach((apiProduct) => {
    // Normalize category
    normalized.categories[apiProduct.category.id] = apiProduct.category;

    // Normalize reviews and their authors
    const reviewIds: number[] = [];
    apiProduct.reviews.forEach((apiReview) => {
      // Normalize user
      normalized.users[apiReview.author.id] = apiReview.author;

      // Normalize review
      normalized.reviews[apiReview.id] = {
        id: apiReview.id,
        text: apiReview.text,
        rating: apiReview.rating,
        authorId: apiReview.author.id,
        productId: apiProduct.id,
        createdAt: apiReview.createdAt,
      };

      reviewIds.push(apiReview.id);
    });

    // Normalize product
    normalized.products[apiProduct.id] = {
      id: apiProduct.id,
      name: apiProduct.name,
      price: apiProduct.price,
      description: apiProduct.description,
      categoryId: apiProduct.category.id,
      reviewIds,
      imageUrl: apiProduct.imageUrl,
      inStock: apiProduct.inStock,
    };
  });

  return {
    products: Object.values(normalized.products),
    categories: Object.values(normalized.categories),
    users: Object.values(normalized.users),
    reviews: Object.values(normalized.reviews),
  };
}

export function normalizeCategoriesResponse(
  categories: ApiCategory[]
): Category[] {
  return categories.map((category) => ({
    id:
      typeof category.id === "string" ? parseInt(category.id, 10) : category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
  }));
}

// Helper to normalize single product response
export function normalizeProductResponse(
  product: ApiProduct
): NormalizedResponse {
  return normalizeProductsResponse([product]);
}

// Helper to create review normalized response
export function normalizeReviewResponse(
  review: Review & { author: User }
): NormalizedResponse {
  return {
    products: [],
    categories: [],
    users: [review.author],
    reviews: [
      {
        id: review.id,
        text: review.text,
        rating: review.rating,
        authorId: review.author.id,
        productId: review.productId,
        createdAt: review.createdAt,
      },
    ],
  };
}
