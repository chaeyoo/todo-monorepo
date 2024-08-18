import React, { useState } from "react";
import styled from "@emotion/styled";
import { Todo } from "shared";

const TodoItemWrapper = styled.li<{ completed: boolean }>`
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: ${(props) =>
		props.completed
			? props.theme.colors.success
			: props.theme.colors.background};
	margin-bottom: 5px;
	border-radius: 4px;
`;

const TodoTitle = styled.span<{ completed: boolean }>`
	flex-grow: 1;
	text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const Button = styled.button`
	margin-left: 5px;
	padding: 5px 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

interface Props {
	todo: Todo;
	onToggle: (id: string) => void;
	onUpdate: (id: string, title: string) => void;
	onDelete: (id: string) => void;
}

export const TodoItem: React.FC<Props> = ({
	todo,
	onToggle,
	onUpdate,
	onDelete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(todo.title);

	const handleUpdate = () => {
		onUpdate(todo.id, editTitle);
		setIsEditing(false);
	};

	return (
		<TodoItemWrapper completed={todo.completed}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => onToggle(todo.id)}
			/>
			{isEditing ? (
				<>
					<input
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
						onBlur={handleUpdate}
						autoFocus
					/>
					<Button onClick={handleUpdate}>Save</Button>
				</>
			) : (
				<>
					<TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
					<Button onClick={() => setIsEditing(true)}>Edit</Button>
				</>
			)}
			<Button onClick={() => onDelete(todo.id)}>Delete</Button>
		</TodoItemWrapper>
	);
};
