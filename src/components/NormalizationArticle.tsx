import React, { useState } from "react";
import { useAppSelector } from "../hooks";
import {
  productsSelectors,
  categoriesSelectors,
  usersSelectors,
  reviewsSelectors,
} from "../store/selectors";
import {
  Database,
  Zap,
  TrendingUp,
  CheckCircle,
  Code,
  ArrowRight,
  BarChart3,
} from "lucide-react";

const NormalizationArticle: React.FC = () => {
  const [activeExample, setActiveExample] = useState<
    "normalized" | "denormalized"
  >("normalized");

  const products = useAppSelector(productsSelectors.selectAll);
  const categories = useAppSelector(categoriesSelectors.selectAll);
  const users = useAppSelector(usersSelectors.selectAll);
  const reviews = useAppSelector(reviewsSelectors.selectAll);

  const stats = {
    products: products.length,
    categories: categories.length,
    users: users.length,
    reviews: reviews.length,
  };

  const normalizedExample = {
    products: {
      1: { id: 1, name: "Gaming Laptop", categoryId: 1, reviewIds: [1, 2] },
    },
    categories: { 1: { id: 1, name: "Electronics" } },
    users: { 1: { id: 1, name: "Sarah Johnson" } },
    reviews: {
      1: { id: 1, text: "Amazing performance!", authorId: 1, productId: 1 },
    },
  };

  const denormalizedExample = [
    {
      id: 1,
      name: "Gaming Laptop",
      category: { id: 1, name: "Electronics" }, // Duplicated!
      reviews: [
        {
          id: 1,
          text: "Amazing performance!",
          author: { id: 1, name: "Sarah Johnson" }, // Duplicated!
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Database className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Data Normalization in Action
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          See how normalized data structure powers this e-commerce application
        </p>
      </div>

      {/* Current App Stats */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          This App's Normalized Structure
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.products}
            </div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.categories}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.users}
            </div>
            <div className="text-sm text-gray-600">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.reviews}
            </div>
            <div className="text-sm text-gray-600">Reviews</div>
          </div>
        </div>
      </div>

      {/* Benefits Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Core Normalization Benefits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Data Structure Benefits */}
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <Database className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-800">
              Data Structure Benefits
            </h3>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>• Single source of truth</li>
              <li>• ID-based relationships</li>
              <li>• Flat, predictable structure</li>
              <li>• Easy entity lookups</li>
            </ul>
          </div>

          {/* Real-Time Update Benefits */}
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <Zap className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-blue-800">Real-Time Updates</h3>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Instant UI synchronization</li>
              <li>• Optimistic updates</li>
              <li>• RTK Query cache sync</li>
              <li>• Consistent state everywhere</li>
            </ul>
          </div>

          {/* Performance Benefits */}
          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-purple-800">
              Performance Benefits
            </h3>
            <ul className="text-sm text-purple-700 mt-2 space-y-1">
              <li>• Memoized selectors</li>
              <li>• Minimal re-renders</li>
              <li>• O(1) entity lookups</li>
              <li>• Efficient updates</li>
            </ul>
          </div>

          {/* Relationship Benefits */}
          <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
            <ArrowRight className="w-6 h-6 text-orange-600 mb-2" />
            <h3 className="font-semibold text-orange-800">
              Relationship Benefits
            </h3>
            <ul className="text-sm text-orange-700 mt-2 space-y-1">
              <li>• Clear entity relationships</li>
              <li>• Easy data traversal</li>
              <li>• Referential integrity</li>
              <li>• Flexible queries</li>
            </ul>
          </div>

          {/* Memory Efficiency */}
          <div className="p-4 border border-indigo-200 rounded-lg bg-indigo-50">
            <BarChart3 className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="font-semibold text-indigo-800">Memory Efficiency</h3>
            <ul className="text-sm text-indigo-700 mt-2 space-y-1">
              <li>• No data duplication</li>
              <li>• Reduced memory footprint</li>
              <li>• Faster serialization</li>
              <li>• Better caching</li>
            </ul>
          </div>

          {/* Update Efficiency */}
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <CheckCircle className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="font-semibold text-red-800">Update Efficiency</h3>
            <ul className="text-sm text-red-700 mt-2 space-y-1">
              <li>• Single update operation</li>
              <li>• Automatic propagation</li>
              <li>• Predictable side effects</li>
              <li>• Transaction-like updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Code className="w-6 h-6 text-gray-600" />
          Structure Comparison
        </h2>

        {/* Toggle Buttons */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveExample("normalized")}
            className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${
              activeExample === "normalized"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ✅ Normalized (Our Approach)
          </button>
          <button
            onClick={() => setActiveExample("denormalized")}
            className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${
              activeExample === "denormalized"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ❌ Denormalized (Alternative)
          </button>
        </div>

        {/* Code Examples */}
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            {activeExample === "normalized" ? (
              <code>{JSON.stringify(normalizedExample, null, 2)}</code>
            ) : (
              <code>{JSON.stringify(denormalizedExample, null, 2)}</code>
            )}
          </pre>
        </div>

        {/* Explanation */}
        <div className="mt-4 p-4 rounded-lg">
          {activeExample === "normalized" ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                ✅ Normalized Benefits:
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Category "Electronics" stored once, referenced by ID</li>
                <li>
                  • User "Sarah Johnson" stored once, referenced by reviews
                </li>
                <li>
                  • Easy to update category name → affects all products
                  instantly
                </li>
                <li>• Memory efficient: No duplicate data</li>
              </ul>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">
                ❌ Denormalized Problems:
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Category data duplicated in every product</li>
                <li>• User data duplicated in every review</li>
                <li>• Update category name → must find/update all products</li>
                <li>• Memory waste: Lots of duplicate data</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Real-World Demo */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <ArrowRight className="w-6 h-6 text-blue-600" />
          Try It Yourself
        </h2>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            Interactive Demo:
          </h3>
          <ol className="text-sm text-blue-700 space-y-2">
            <li>
              <strong>1.</strong> Click the ⋮ menu on any product card
            </li>
            <li>
              <strong>2.</strong> Select "Edit" and change the product name
            </li>
            <li>
              <strong>3.</strong> Notice how it updates instantly in both the
              grid and detail page
            </li>
            <li>
              <strong>4.</strong> Open Browser DevTools → Redux tab to see the
              normalized structure
            </li>
            <li>
              <strong>5.</strong> Watch how one update affects multiple UI
              components seamlessly
            </li>
          </ol>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Performance Impact Analysis
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Memory Efficiency */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Memory Efficiency
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Normalized:</span>
                <span className="text-sm font-mono bg-green-200 px-2 py-1 rounded text-green-800">
                  {stats.products +
                    stats.categories +
                    stats.users +
                    stats.reviews}{" "}
                  entities
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Denormalized:</span>
                <span className="text-sm font-mono bg-red-200 px-2 py-1 rounded text-red-800">
                  ~{stats.products * 3} entities
                </span>
              </div>
              <div className="text-xs text-green-700 bg-green-200 p-2 rounded">
                <strong>
                  {Math.round(
                    ((stats.products * 3 -
                      (stats.products +
                        stats.categories +
                        stats.users +
                        stats.reviews)) /
                      (stats.products * 3)) *
                      100
                  )}
                  % memory saved
                </strong>{" "}
                through normalization
              </div>
            </div>
          </div>

          {/* Update Efficiency */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Update Efficiency
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Category update:</span>
                <span className="text-sm font-mono bg-green-200 px-2 py-1 rounded text-green-800">
                  1 operation
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Without normalization:</span>
                <span className="text-sm font-mono bg-red-200 px-2 py-1 rounded text-red-800">
                  {stats.products} operations
                </span>
              </div>
              <div className="text-xs text-blue-700 bg-blue-200 p-2 rounded">
                <strong>{stats.products}x faster</strong> category updates
              </div>
            </div>
          </div>

          {/* Relationship Benefits */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-purple-600" />
              Query Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Entity lookup:</span>
                <span className="text-sm font-mono bg-green-200 px-2 py-1 rounded text-green-800">
                  O(1)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Find by category:</span>
                <span className="text-sm font-mono bg-green-200 px-2 py-1 rounded text-green-800">
                  O(n)
                </span>
              </div>
              <div className="text-xs text-purple-700 bg-purple-200 p-2 rounded">
                <strong>Instant lookups</strong> via ID-based access
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Benefits Demo */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Real-Time Update Benefits
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-orange-800 mb-1">
                ✅ With Normalization (This App):
              </h4>
              <ul className="text-orange-700 space-y-1">
                <li>• Edit product → Instant update everywhere</li>
                <li>• Change category → All products reflect change</li>
                <li>• Add review → Real-time sync across UI</li>
                <li>• Optimistic updates work seamlessly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-800 mb-1">
                ❌ Without Normalization:
              </h4>
              <ul className="text-red-700 space-y-1">
                <li>• Must manually update multiple places</li>
                <li>• Risk of inconsistent state</li>
                <li>• Complex synchronization logic needed</li>
                <li>• Potential data corruption issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Why This Matters</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          This e-commerce app demonstrates how proper data normalization creates
          scalable, maintainable applications. The patterns shown here are used
          by major platforms like Netflix, Amazon, and Facebook to manage
          millions of entities efficiently.
        </p>
      </div>
    </div>
  );
};

export default NormalizationArticle;
