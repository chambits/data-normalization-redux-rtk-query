import React, { useState } from "react";
import { Star, ShoppingCart, Edit, Trash2, MoreVertical } from "lucide-react";
import { useProduct } from "../hooks";
import { useDeleteProductMutation } from "../store/api/apiSlice";
import ProductForm from "./ProductForm";

interface ProductCardProps {
  productId: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  const product = useProduct(productId);
  const [imageError, setImageError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  if (!product) return null;

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId).unwrap();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
    setShowMenu(false);
  };

  const handleEditFormSuccess = () => {
    setShowEditForm(false);
  };

  return (
    <>
      <div className="card animate-fade-in hover:-translate-y-1 transition-transform duration-300 relative">
        <div className="relative">
          {imageError ? (
            <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <span className="text-gray-500 text-sm">
                  Image not available
                </span>
              </div>
            </div>
          ) : (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-xl"
              onError={handleImageError}
            />
          )}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {product.category?.icon} {product.category?.name}
          </div>

          {/* Product Actions Menu */}
          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="bg-white/90 backdrop-blur p-1 rounded-full hover:bg-white transition-colors"
              disabled={isDeleting}
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border py-1 z-10 min-w-[120px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditForm(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  disabled={isDeleting}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>

            <button
              disabled={!product.inStock}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                product.inStock
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      {showEditForm && (
        <ProductForm
          product={product}
          onClose={() => setShowEditForm(false)}
          onSuccess={handleEditFormSuccess}
        />
      )}
    </>
  );
};

export default ProductCard;
