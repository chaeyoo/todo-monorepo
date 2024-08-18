import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTodoStore } from "../store/todoStore";

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
`;

export const TodoForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const addTodo = useTodoStore((state) => state.addTodo);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			addTodo(title);
			setTitle("");
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Add a new todo"
			/>
			<Button type="submit">Add</Button>
		</Form>
	);
};
