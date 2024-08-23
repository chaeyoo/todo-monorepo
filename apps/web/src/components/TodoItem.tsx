import React, { useState } from "react";
import styled from "@emotion/styled";
import { Todo } from "shared";
import { colors, commonStyles, animations } from "shared/src/styles/todoStyles";

const TodoItemWrapper = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${(props) => props.completed ? colors.background : colors.secondary};
  margin-bottom: 8px;
  border: 1px solid ${colors.primary};
  transition: all 0.3s ease;
  animation: ${animations.slideIn} 0.3s ease-out;

  &:hover {
    transform: translateX(5px);
  }
`;

const TodoTitle = styled.span<{ completed: boolean }>`
  flex-grow: 1;
  margin-left: 10px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${colors.primary};
`;

const Button = styled.button`
  ${commonStyles.button}
  padding: 6px 12px;
  font-size: 0.9rem;
  margin-left: 8px;
`;

const DeleteButton = styled(Button)`
  background-color: ${colors.accent};
  &:hover {
    background-color: ${colors.primary};
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.primary};
  border-radius: 0;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:checked {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
  }

  &:checked::after {
    content: '✓';
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.secondary};
    font-size: 14px;
  }
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
        console.error("할 일 수정 실패:", error);
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
      console.error("할 일 상태 변경 실패:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(todo.id);
    } catch (error) {
      console.error("할 일 삭제 실패:", error);
    }
  };

  return (
    <TodoItemWrapper completed={todo.completed}>
      <Checkbox
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
            {isUpdating ? "저장 중..." : "저장"}
          </Button>
        </>
      ) : (
        <>
          <TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
          <Button onClick={() => setIsEditing(true)} disabled={isUpdating}>
            수정
          </Button>
        </>
      )}
      {!isEditing && (
        <DeleteButton onClick={handleDelete} disabled={isUpdating}>
          삭제
        </DeleteButton>
      )}
    </TodoItemWrapper>
  );
};