import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer, // 'todo' is the key for this slice in state
  },
});
