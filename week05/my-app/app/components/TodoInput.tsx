"use client";

import { useState } from "react";
import type {Todo} from "../types/todo";

type TodoInputProps = {
    addTodo : (text: string)=>void;
}

function TodoInput({ addTodo } : TodoInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력"
      />
      <button type="submit">+</button>
    </form>
  );
}

export default TodoInput;