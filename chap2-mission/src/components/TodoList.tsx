import React from 'react'
import { TTodo } from '../types/todo';

interface TodoListProps {
    title : string;
    todos: TTodo[];
    buttonLabel: string;
    buttonColor: string;
    onClick: (todo: TTodo) => void;
}

const TodoList = ({title,todos,buttonLabel,buttonColor,onClick}:TodoListProps) => {
  return (
    <div className="render-container__section">
    <h2 className="render-container__title">할 일 </h2>
    <ul id="todo-list" className= "render-container__list">
        {todos.map((todo): any => (
            <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <button onClick={() : void => onClick(todo)}
            style={{backgroundColor: '#28a745',}}className="render-container__item-button"> 완료</button>
            </li>
        ))}
    </ul>
    </div>
  );
};

export default TodoList;
