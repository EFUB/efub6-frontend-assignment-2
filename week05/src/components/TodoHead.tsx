import React from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid #e9ecef;

  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }

  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

interface todo {
  id: number;
  done: boolean;
}
function TodoHead({ todos }: { todos: todo[] }) {
  // 힌트 1: new Date()로 오늘 날짜를 가져오세요
  // toLocaleDateString으로 한국어 형식으로 변환!
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  // 힌트 2: todos 배열에서 done이 false인 것만 필터링해서 개수를 세세요
  const undoneTasks = todos ? todos.filter((todo) => !todo.done).length : 0;

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      {/* 힌트 3: 남은 할 일 개수를 표시하세요 */}
      <div className="tasks-left">할 일 {undoneTasks}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
