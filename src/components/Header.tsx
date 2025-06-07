import React, { useState } from "react";
import { ShoppingBag, Search, User, Plus } from "lucide-react";
import ProductForm from "./ProductForm";

const Header: React.FC = () => {
  const [showProductForm, setShowProductForm] = useState(false);

  const handleProductFormSuccess = () => {
    setShowProductForm(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                NormalizedStore
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowProductForm(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {showProductForm && (
        <ProductForm
          onClose={() => setShowProductForm(false)}
          onSuccess={handleProductFormSuccess}
        />
      )}
    </>
  );
};

export default Header;
