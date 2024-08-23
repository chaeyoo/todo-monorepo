import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";

const Form = styled.form`
	display: flex;
	margin-bottom: 20px;
`;

const Input = styled.input`
	flex-grow: 1;
	padding: 10px;
	font-size: 16px;
	border: 1px solid ${(props) => props.theme.colors.secondary};
	border-radius: 4px 0 0 4px;
`;

const Button = styled.button`
	padding: 10px 20px;
	font-size: 16px;
	background-color: ${(props) => props.theme.colors.primary};
	color: white;
	border: none;
	border-radius: 0 4px 4px 0;
	cursor: pointer;
	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 14px;
	margin-top: 5px;
`;

export const TodoForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isAdding, setIsAdding] = useState(false);
	const addTodo = useTodoStore((state) => state.addTodo);
	const user = useAuthStore((state) => state.user);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (title.trim() && user) {
			setIsAdding(true);
			try {
				await addTodo(title, user.id);
				setTitle("");
				console.log("Todo added successfully");
			} catch (err) {
				setError("Failed to add todo. Please try again.");
				console.error("Error adding todo:", err);
			} finally {
				setIsAdding(false);
			}
		}
	};
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Add a new todo"
					disabled={!user || isAdding}
				/>
				<Button type="submit" disabled={!user || isAdding}>
					{isAdding ? "Adding..." : "Add"}
				</Button>
			</Form>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{!user && <ErrorMessage>Please log in to add todos.</ErrorMessage>}
		</>
	);
};
