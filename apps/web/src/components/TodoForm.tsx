import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";
import { colors, commonStyles, animations } from "shared/src/styles/todoStyles";

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
  animation: ${animations.fadeIn} 0.5s ease-out;
`;

const Input = styled.input`
  ${commonStyles.input}
  flex-grow: 1;
  margin-right: 10px;
`;

const Button = styled.button`
  ${commonStyles.button}
`;

const ErrorMessage = styled.p`
  color: ${colors.primary};
  font-size: 0.9rem;
  margin-top: 5px;
  animation: ${animations.fadeIn} 0.3s ease-out;
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
        console.log("할 일이 성공적으로 추가되었습니다.");
      } catch (err) {
        setError("할 일 추가에 실패했습니다. 다시 시도해 주세요.");
        console.error("할 일 추가 오류:", err);
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
          placeholder="새로운 할 일을 입력하세요"
          disabled={!user || isAdding}
        />
        <Button type="submit" disabled={!user || isAdding}>
          {isAdding ? "추가 중..." : "추가"}
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!user && <ErrorMessage>할 일을 추가하려면 로그인해 주세요.</ErrorMessage>}
    </>
  );
};