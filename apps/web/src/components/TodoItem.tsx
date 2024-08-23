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
	onToggle: (id: string) => Promise<void>;
	onUpdate: (id: string, title: string) => Promise<void>;
	onDelete: (id: string) => Promise<void>;
}

export const TodoItem: React.FC<Props> = ({
	todo,
	onToggle,
	onUpdate,
	onDelete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(todo.title);
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdate = async () => {
		if (editTitle.trim() !== todo.title) {
			setIsUpdating(true);
			try {
				await onUpdate(todo.id, editTitle);
				setIsEditing(false);
			} catch (error) {
				console.error("Failed to update todo:", error);
				// 에러 처리 (예: 사용자에게 알림)
			} finally {
				setIsUpdating(false);
			}
		} else {
			setIsEditing(false);
		}
	};

	const handleToggle = async () => {
		try {
			await onToggle(todo.id);
		} catch (error) {
			console.error("Failed to toggle todo:", error);
		}
	};

	const handleDelete = async () => {
		try {
			await onDelete(todo.id);
		} catch (error) {
			console.error("Failed to delete todo:", error);
		}
	};
	return (
		<TodoItemWrapper completed={todo.completed}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={handleToggle}
				disabled={isUpdating}
			/>
			{isEditing ? (
				<>
					<input
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
						onBlur={handleUpdate}
						autoFocus
						disabled={isUpdating}
					/>
					<Button onClick={handleUpdate} disabled={isUpdating}>
						{isUpdating ? "Saving..." : "Save"}
					</Button>
				</>
			) : (
				<>
					<TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
					<Button onClick={() => setIsEditing(true)} disabled={isUpdating}>
						Edit
					</Button>
				</>
			)}
			{!isEditing && (
				<Button onClick={handleDelete} disabled={isUpdating}>
					Delete
				</Button>
			)}
		</TodoItemWrapper>
	);
};
