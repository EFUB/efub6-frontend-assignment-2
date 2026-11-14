"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoButton from "@/components/TodoButton";

const ClockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 100px auto;
  background-color: white;
  width: 80%;
  padding: 400px 200px;
  border-radius: 30px;
`;
const Clock = styled.h1`
  font-size: 80px;
`;
export default function TimePage() {
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <TodoButton />
      <ClockWrapper>
        <h1>{dateString}</h1>
        <Clock>현재 시각 : {time.toLocaleTimeString()}</Clock>
      </ClockWrapper>
    </>
  );
}
