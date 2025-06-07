import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { User, UsersState } from "../../types";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState() as UsersState,
  reducers: {
    addUser: usersAdapter.addOne,
    addManyUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      // Sync with RTK Query results - from products query
      .addMatcher(
        apiSlice.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          if (action.payload.users) {
            usersAdapter.upsertMany(state, action.payload.users);
          }
        }
      )
      // Sync with RTK Query results - from single product query
      .addMatcher(
        apiSlice.endpoints.getProduct.matchFulfilled,
        (state, action) => {
          if (action.payload.users) {
            usersAdapter.upsertMany(state, action.payload.users);
          }
        }
      );
  },
});

export const { addUser, addManyUsers, updateUser, removeUser } =
  usersSlice.actions;

export const usersReducer = usersSlice.reducer;
export { usersAdapter };
