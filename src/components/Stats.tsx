import React from "react";
import { useAppSelector } from "../hooks";
import {
  productsSelectors,
  categoriesSelectors,
  reviewsSelectors,
} from "../store/selectors";
import { Package, Tag, Star } from "lucide-react";

const Stats: React.FC = () => {
  const products = useAppSelector(productsSelectors.selectAll);
  const categories = useAppSelector(categoriesSelectors.selectAll);
  const reviews = useAppSelector(reviewsSelectors.selectAll);

  const inStockProducts = products.filter((p) => p.inStock).length;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "blue",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Tag,
      color: "green",
    },
    {
      label: "In Stock",
      value: inStockProducts,
      icon: Package,
      color: "emerald",
    },
    {
      label: "Avg Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
