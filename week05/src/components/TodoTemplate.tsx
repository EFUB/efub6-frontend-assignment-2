import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;
  margin: 80px auto;
  margin-bottom: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// 힌트: children을 props로 받아서 TodoTemplateBlock 안에 렌더링하세요
// children은 App.jsx에서 <TodoTemplate> 안에 넣은 내용들이에요
function TodoTemplate({ children }: { children: React.ReactNode }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
