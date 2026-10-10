"use client";
import React from "react";
import TodoItem from "./TodoItem";
import type {Todo} from "../types/todo";

type TodoListProps = {
    todos : Todo[];
    deleteTodo : (id : number) => void;
    toggleTodo : (id : number) => void;
    editTodo : (id : number, nextText : string) => void;
}


function TodoList({ todos, deleteTodo, toggleTodo, editTodo } : TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;