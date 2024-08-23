import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TodoItem } from "./TodoItem";
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";
import { colors, commonStyles, animations } from "shared/src/styles/todoStyles";

const TodoListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  animation: ${animations.fadeIn} 0.5s ease-out;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${colors.primary};
  font-size: 1rem;
  margin: 20px 0;
  animation: ${animations.pulse} 1.5s infinite;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: ${colors.primary};
  font-size: 1rem;
  margin: 20px 0;
  padding: 10px;
  background-color: ${colors.background};
  border: 1px solid ${colors.primary};
  animation: ${animations.fadeIn} 0.5s ease-out;
`;

export const TodoList: React.FC = () => {
  const { todos, toggleTodo, updateTodo, deleteTodo, fetchTodos } = useTodoStore();
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
          setError("할 일 목록을 불러오는데 실패했습니다. 다시 시도해 주세요.");
          console.error("할 일 목록 불러오기 오류:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("할 일 목록을 보려면 로그인해 주세요.");
      }
    };

    loadTodos();
  }, [user, fetchTodos]);

  if (loading) {
    return <LoadingMessage>할 일 목록 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!user) {
    return <ErrorMessage>할 일 목록을 보려면 로그인해 주세요.</ErrorMessage>;
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