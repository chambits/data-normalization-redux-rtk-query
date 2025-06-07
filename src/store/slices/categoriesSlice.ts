import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { Category, CategoriesState } from "../../types";

const categoriesAdapter = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState() as CategoriesState,
  reducers: {
    addCategory: categoriesAdapter.addOne,
    addManyCategories: categoriesAdapter.addMany,
    updateCategory: categoriesAdapter.updateOne,
    removeCategory: categoriesAdapter.removeOne,
  },
});

export const {
  addCategory,
  addManyCategories,
  updateCategory,
  removeCategory,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
export { categoriesAdapter };
