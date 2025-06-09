import { createSlice, nanoid } from "@reduxjs/toolkit";
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

const initialState = {
 todos: savedTodos,
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const Todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,  // initialize completed as false
      };
      state.todos.push(Todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
    },
    ToggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    },
  },
});

export const { addTodo, removeTodo,updateTodo,ToggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
