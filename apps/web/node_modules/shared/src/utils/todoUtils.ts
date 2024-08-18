import { Todo } from "../types/todo";

export const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const createTodo = (title: string): Todo => ({
	id: generateId(),
	title,
	completed: false,
});
