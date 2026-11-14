"use client";
import React, { useState } from "react";
import styled from "styled-components";

const InsertForm = styled.form`
  padding: 20px 32px;
  border-top: 1px solid #e9ecef;
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 18px;
  outline: none;
`;

function TodoCreate({ onCreate }: { onCreate: (text: string) => void }) {
  // 힌트 1: useState로 입력값(value) 상태를 관리하세요
  const [value, setValue] = useState("");

  // 힌트 2: form 제출 시 실행되는 함수
  // - e.preventDefault()로 새로고침 방지
  // - value가 비어있으면 return
  // - onCreate(value)로 todo 추가
  // - setValue('')로 입력창 초기화
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onCreate(value);
    setValue("");
  };

  return (
    <InsertForm onSubmit={onSubmit}>
      {/* 힌트 3: Input의 value와 onChange를 연결하세요 */}
      <Input
        placeholder="할 일을 입력 후, Enter를 누르세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InsertForm>
  );
}

export default TodoCreate;
