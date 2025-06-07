import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import Stats from "../components/Stats";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to NormalizedStore with RTK Query
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the power of RTK Query with normalized data. Server state
          management with automatic caching and synchronization.
        </p>
      </div>

      <Stats />
      <CategoryFilter />
      <ProductGrid onProductClick={handleProductClick} />
    </>
  );
};

export default HomePage;
