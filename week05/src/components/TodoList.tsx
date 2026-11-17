"use client";

import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  overflow-y: auto;
`;

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

function TodoList({ todos, onRemove, onToggle, onUpdate }: TodoListProps) {
  return (
    <TodoListBlock>
      {/* 힌트: todos 배열을 map으로 순회하면서 TodoItem 컴포넌트를 렌더링하세요 */}
      {/* 각 TodoItem에 key, id, text, done, onRemove, onToggle을 전달! */}
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          onRemove={onRemove}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
