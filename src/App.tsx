import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import HomePage from "./pages/HomePage";
import NormalizationPage from "./pages/NormalizationPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "./store/api/apiSlice";
import { store } from "./store/store";

const AppContent: React.FC = () => {
  // RTK Query hooks replace manual data loading
  const { error: productsError, isLoading: productsLoading } =
    useGetProductsQuery();

  const { error: categoriesError, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col gradient-bg">
        <Header />
        <div className="flex-1">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col gradient-bg">
        <Header />
        <div className="flex-1">
          <ErrorMessage error={error} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/normalization" element={<NormalizationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
