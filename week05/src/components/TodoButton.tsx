import React from "react";
import Link from "next/link";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px;
`;

const StyledButton = styled.button`
  width: 150px;
  height: auto;
  padding: 10px;
  font-size: 20px;
  border-radius: 15px;
  border: none;
  background-color: #69c2a7;
  &:hover {
    background-color: #9be2cc;
  }
`;

function TodoButton() {
  return (
    <ButtonWrapper>
      <Link href="/">
        <StyledButton> 돌아가기 </StyledButton>
      </Link>
    </ButtonWrapper>
  );
}

export default TodoButton;
