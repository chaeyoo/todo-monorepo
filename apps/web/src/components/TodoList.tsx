import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TodoItem } from "./TodoItem";
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";

const TodoListWrapper = styled.ul`
	list-style-type: none;
	padding: 0;
`;

const LoadingMessage = styled.p`
	text-align: center;
	color: #666;
`;

const ErrorMessage = styled.p`
	text-align: center;
	color: red;
`;

export const TodoList: React.FC = () => {
	const { todos, toggleTodo, updateTodo, deleteTodo, fetchTodos } =
		useTodoStore();
	const { user } = useAuthStore();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadTodos = async () => {
			if (user) {
				try {
					setLoading(true);
					setError(null);
					await fetchTodos(user.id);
				} catch (err) {
					setError("Failed to load todos. Please try again later.");
					console.error("Error loading todos:", err);
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
				setError("Please log in to view your todos.");
			}
		};

		loadTodos();
	}, [user, fetchTodos]);

	  useEffect(() => {
		console.log("Todos updated:", todos);
	  }, [todos]);

	if (loading) {
		return <LoadingMessage>Loading todos...</LoadingMessage>;
	}

	if (error) {
		return <ErrorMessage>{error}</ErrorMessage>;
	}

	if (!user) {
		return <ErrorMessage>Please log in to view your todos.</ErrorMessage>;
	}

	return (
		<TodoListWrapper>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={toggleTodo}
					onUpdate={updateTodo}
					onDelete={deleteTodo}
				/>
			))}
		</TodoListWrapper>
	);
};
