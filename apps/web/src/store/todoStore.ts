import create from 'zustand';
import { Todo, createTodo } from 'shared';

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (title) => set((state) => ({ todos: [...state.todos, createTodo(title)] })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  updateTodo: (id, title) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, title } : todo
    ),
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id),
  })),
}));