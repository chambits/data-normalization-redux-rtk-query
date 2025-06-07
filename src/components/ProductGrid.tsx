import React from "react";
import { useProductsByCategory, useAppSelector } from "../hooks";
import {
  selectProductsLoadingStatus,
  selectProductsError,
} from "../store/selectors";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import type { Product } from "../types";

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
      {products.map((product: Product) => (
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
