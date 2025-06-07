import React, { useState } from "react";
import { Star, Calendar, ArrowLeft } from "lucide-react";
import { useProduct } from "../hooks";

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
  const product = useProduct(productId);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Product not found</p>
        <button onClick={onBack} className="btn-primary mt-4">
          Back to Products
        </button>
      </div>
    );
  }

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  return (
    <div className="animate-slide-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {imageError ? (
            <div className="w-full h-96 bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📷</div>
                <span className="text-gray-500">Image not available</span>
              </div>
            </div>
          ) : (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              {product.category?.icon} {product.category?.name}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {averageRating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <button
            disabled={!product.inStock}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              product.inStock
                ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="card">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={
                        review.author?.avatar ||
                        `https://ui-avatars.com/api/?name=${review.author?.name}&background=f3f4f6&color=374151`
                      }
                      alt={review.author?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {review.author?.name || "Anonymous"}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
