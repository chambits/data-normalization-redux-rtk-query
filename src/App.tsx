import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "./store/api/apiSlice";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import Stats from "./components/Stats";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

const AppContent: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // RTK Query hooks replace manual data loading
  const { error: productsError, isLoading: productsLoading } =
    useGetProductsQuery();

  const { error: categoriesError, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg">
        <Header />
        <ErrorMessage error={error} />
      </div>
    );
  }

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProductId ? (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToProducts}
          />
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to NormalizedStore with RTK Query
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the power of RTK Query with normalized data. Server
                state management with automatic caching and synchronization.
              </p>
            </div>

            <Stats />
            <CategoryFilter />
            <ProductGrid onProductClick={handleProductClick} />
          </>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
