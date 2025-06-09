import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, ToggleTodo, updateTodo } from '../features/todoSlice';
import { motion, AnimatePresence } from 'framer-motion';

function SimpleTodo() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text ?? '');
  };

  const saveEdit = (todoId) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: todoId, text: editText }));
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">📝 Your Todos</h2>

      {todos.length === 0 ? (
        <p className="text-center text-gray-400 italic">No todos yet. Add something!</p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 flex-grow">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(ToggleTodo(todo.id))}
                    className="w-5 h-5 cursor-pointer accent-green-500"
                  />

                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => saveEdit(todo.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(todo.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      autoFocus
                      className="flex-grow border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  ) : (
                    <span
                      onDoubleClick={() => startEditing(todo)}
                      className={`flex-grow text-gray-700 transition-all duration-300 cursor-pointer select-none ${
                        todo.completed ? 'line-through text-gray-400' : ''
                      }`}
                      title="Double click to edit"
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  {editingId !== todo.id && (
                    <button
                      onClick={() => startEditing(todo)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Edit"
                    >
                      ✎
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

export default SimpleTodo;
