import React from 'react'


interface TodoFormProps {
    input : string;
    setInput : (input: string) => void;
    handleSubmit: (e:React.FormEvent<HTMLFormElement>) => void;

}

const TodoForm = ({input, setInput, handleSubmit}: TodoFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
    <input 
    value = {input}
    onChange={(e) : void => setInput(e.target.value)}
    className="todo-container__input"
        placeholder="할 일 입력" required />
        <button className="todo-container__button">할일 추가</button>
    </form>
  );
};

export default TodoForm;