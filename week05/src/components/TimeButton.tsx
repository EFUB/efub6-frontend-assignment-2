import React from "react";
import Link from "next/link";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 542px;
  height: 80px;
  padding: 20px;
  font-size: 20px;
  border-radius: 15px;
  border: none;
  background-color: #69c2a7;
  &:hover {
    background-color: #9be2cc;
    font-size: 25px;
    width: 570px;
  }
`;

function TimeButton() {
  return (
    <ButtonWrapper>
      <Link href="/time">
        <StyledButton>현재 시각 확인하기</StyledButton>
      </Link>
    </ButtonWrapper>
  );
}

export default TimeButton;
