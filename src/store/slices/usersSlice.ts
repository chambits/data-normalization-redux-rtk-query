import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { User, UsersState } from "../../types";

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
});

export const { addUser, addManyUsers, updateUser, removeUser } =
  usersSlice.actions;

export const usersReducer = usersSlice.reducer;
export { usersAdapter };
