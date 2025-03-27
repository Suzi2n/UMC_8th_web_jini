import { FormEvent, useState } from "react";
import { TTodo } from "../types/todo";
import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";

const Todo = ()  => {
const [todos, setTodos] = useState<TTodo[]>([

    ]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const text = input.trim();

        if (text) {
            const newTodo : TTodo = { id: Date.now(), text};
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            setInput('');
        }
    };

    const completeTodo = (todo: TTodo) : void => {
        setTodos(preTodos => preTodos.filter((t) : Boolean => t.id !== todo.id));    // 동일하지 않은 id만 남기
        setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo) : void => {
        setDoneTodos((prevDoneTodos) : TTodo[] => prevDoneTodos.filter((t) : Boolean => t.id !== todo.id)
        );
    };
    
    return (
        <div className="todo-container">
            <h1 className="todo-container__header">TODO</h1>
            <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit}/>
            <div className="render-container">
                <TodoList 
                    title = '할 일' 
                    todos={todos} 
                    buttonLabel='완료' 
                    buttonColor = '#28a745'
                    onClick = {completeTodo}
                />
                <TodoList 
                    title = '할 일' 
                    todos={doneTodos} 
                    buttonLabel='삭제' 
                    buttonColor = '#dc3545'
                    onclick={deleteTodo}
                />
                
            </div>
        </div>
    );
};

export default Todo;