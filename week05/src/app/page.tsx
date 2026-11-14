"use client";

import { useEffect, useState } from "react";
import TodoTemplate from "@/components/TodoTemplate";
import TodoHead from "@/components/TodoHead";
import TodoList from "@/components/TodoList";
import TodoCreate from "@/components/TodoCreate";
import TimeButton from "@/components/TimeButton";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

interface TodoFunctions {
  onCreate: (text: string) => void;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);

  // 마운트 후에 localStorage에서 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    setLoaded(true);
  }, []);

  // 불러온 뒤에만 저장 (빈 배열로 덮어쓰는 것 방지)
  useEffect(() => {
    if (loaded) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, loaded]);

  const onCreate = (text: string) => {
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      text,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const onRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const onUpdate = (id: number, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <>
      <TodoTemplate>
        <TodoHead todos={todos} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
        <TodoCreate onCreate={onCreate} />
      </TodoTemplate>
      <TimeButton />
    </>
  );
}
