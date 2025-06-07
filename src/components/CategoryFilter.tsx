import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSelectedCategory } from "../store/slices/productsSlice";
import {
  categoriesSelectors,
  selectSelectedCategoryId,
} from "../store/selectors";

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesSelectors.selectAll);
  const selectedCategoryId = useAppSelector(selectSelectedCategoryId);

  const handleCategoryChange = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategoryId === null
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedCategoryId === category.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
