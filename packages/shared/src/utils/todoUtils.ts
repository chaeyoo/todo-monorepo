import { supabase } from "../supabase";
import { Todo } from "../types/todo";

export const generateId = (): string =>
	Math.random().toString(36).substring(2, 9);

export const createTodo = async (
	title: string,
	userId: string
): Promise<Todo | null> => {
	const { data, error } = await supabase
		.from("todos")
		.insert({ title, created_by: userId })
		.single();

	if (error) {
		console.error("Error creating todo:", error);
		return null;
	}

	return data;
};

export const fetchTodos = async (userId: string): Promise<Todo[]> => {
	const { data, error } = await supabase
		.from("todos")
		.select("*")
		.eq("created_by", userId)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching todos:", error);
		return [];
	}

	return data || [];
};
