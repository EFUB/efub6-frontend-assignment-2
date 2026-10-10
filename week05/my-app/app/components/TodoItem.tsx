"use client";
import { useState } from "react";
import type {Todo} from "../types/todo";

type TodoItemProps = {
    todo : Todo;
    deleteTodo : (id : number) => void;
    toggleTodo : (id : number) => void;
    editTodo : (id : number, nextText : string) => void;
}

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo } : TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {

    if(!newText.trim()) return;
    editTodo(todo.id, newText.trim());
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button className="small" onClick={handleEdit}>저장</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            aria-label={`${todo.text} 완료`}
          />
          <span>{todo.text}</span>
          <button className="small" onClick={() => setIsEditing(true)}>수정</button>
          <button className="small" onClick={() => deleteTodo(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;