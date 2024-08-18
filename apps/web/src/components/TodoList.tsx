import React from "react";
import styled from "@emotion/styled";
import { TodoItem } from "./TodoItem";
import { useTodoStore } from "../store/todoStore";

const TodoListWrapper = styled.ul`
	list-style-type: none;
	padding: 0;
`;

export const TodoList: React.FC = () => {
	const { todos, toggleTodo, updateTodo, deleteTodo } = useTodoStore();

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
