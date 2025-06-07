import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppDispatch } from "./hooks";
import {
  addManyProducts,
  addManyCategories,
  addManyUsers,
  addManyReviews,
  setLoadingStatus,
} from "./store/slices";
import {
  mockCategories,
  mockUsers,
  mockReviews,
  mockProducts,
} from "./data/mockData";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import Stats from "./components/Stats";

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Simulate loading data
    dispatch(setLoadingStatus("loading"));

    setTimeout(() => {
      // Load mock data into normalized state
      dispatch(addManyCategories(mockCategories));
      dispatch(addManyUsers(mockUsers));
      dispatch(addManyReviews(mockReviews));
      dispatch(addManyProducts(mockProducts));
      dispatch(setLoadingStatus("succeeded"));
    }, 1000);
  }, [dispatch]);

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
                Welcome to NormalizedStore
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the power of normalized data in React. Browse our
                products with lightning-fast updates and consistent state
                management.
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
