import create from "zustand";
import {
	Todo,
	createTodo,
	fetchTodos as apiFetchTodos,
	supabase,
} from "shared";
import { useAuthStore } from "./authStore";

interface TodoState {
	todos: Todo[];
	addTodo: (title: string, userId: string) => Promise<void>;
	toggleTodo: (id: string) => Promise<void>;
	updateTodo: (id: string, title: string) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
	fetchTodos: (userId: string) => Promise<void>;
}
export const useTodoStore = create<TodoState>((set) => ({
	todos: [],
	addTodo: async (title: string, userId: string) => {
		const { data, error } = await supabase
			.from("todos")
			.insert({ title, created_by: userId })
			.select()
			.single();

		if (error) {
			console.error("Error adding todo:", error);
			throw error;
		}

		if (data) {
			set((state) => ({ todos: [data, ...state.todos] }));
		}
	},

	toggleTodo: async (id: string) => {
		const { data: currentTodo, error: fetchError } = await supabase
			.from("todos")
			.select("completed")
			.eq("id", id)
			.single<Todo>();

		if (fetchError) {
			console.error("Error fetching todo:", fetchError);
			return;
		}

		if (!currentTodo) {
			console.error("Todo not found");
			return;
		}

		const { data, error } = await supabase
			.from("todos")
			.update({ completed: !currentTodo.completed })
			.eq("id", id)
			.select()
			.single<Todo>();

		if (error) {
			console.error("Error toggling todo:", error);
			return;
		}

		if (data) {
			set((state) => ({
				todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
			}));
		}
	},
	updateTodo: async (id: string, title: string) => {
		const { data, error } = await supabase
			.from("todos")
			.update({ title })
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating todo:", error);
			throw error;
		}

		if (data) {
			set((state) => ({
				todos: state.todos.map((todo) =>
					todo.id === id ? { ...todo, ...data } : todo
				),
			}));
		}
	},

	deleteTodo: async (id) => {
		const { error } = await supabase.from("todos").delete().eq("id", id);

		if (error) {
			console.error("Error deleting todo:", error);
			return;
		}

		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		}));
	},

	fetchTodos: async (userId: string) => {
		const todos = await apiFetchTodos(userId);
		set({ todos });
	},
}));
