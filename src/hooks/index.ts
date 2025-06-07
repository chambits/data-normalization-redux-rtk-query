import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  selectProductWithDetails,
  selectProductsByCategory,
} from "../store/selectors";

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hooks for common operations
export const useProduct = (productId: number) => {
  return useAppSelector((state) => selectProductWithDetails(state, productId));
};

export const useProductsByCategory = () => {
  return useAppSelector(selectProductsByCategory);
};
