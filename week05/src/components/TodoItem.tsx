"use client";

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

interface TodoItemProps {
  id: number;
  done: boolean;
  text: string;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

function TodoItem({
  id,
  done,
  text,
  onRemove,
  onToggle,
  onUpdate,
}: TodoItemProps) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);

  const onEdit = () => {
    setEdit(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onUpdate(id, value);
      setEdit(false);
    }
  };

  const onBlur = () => {
    setEdit(false);
    setValue(text);
  };

  return (
    <TodoItemBlock>
      {/* 힌트 1: CheckCircle 클릭 시 onToggle(id) 호출, done 상태 전달 */}
      <CheckCircle done={done} onClick={() => onToggle(id)}>
        {done && <MdDone />}
      </CheckCircle>

      {edit ? (
        <input
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          autoFocus
          style={{
            flex: 1,
            fontSize: "21px",
            color: "#495057",
            border: "none",
            outline: "none",
            padding: "0",
            background: "none",
          }}
        />
      ) : (
        <Text done={done} onClick={onEdit}>
          {text}
        </Text>
      )}

      {/* 힌트 3: Remove 클릭 시 onRemove(id) 호출 */}
      <Remove onClick={() => onRemove(id)}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
