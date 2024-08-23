import { Todo } from "../types/todo";
export declare const generateId: () => string;
export declare const createTodo: (title: string, userId: string) => Promise<Todo | null>;
export declare const fetchTodos: (userId: string) => Promise<Todo[]>;
