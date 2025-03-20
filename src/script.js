"use strict";

const todoInputElem = document.querySelector('.todo-input');
const todoListElem = document.querySelector('.todo-list');
const todoListCompleted = document.querySelector('.completed-list');
let todos = [];
let id = 0;

// 할 일 목록을 설정하는 함수
const setTodos = (newTodos) => {
    todos = newTodos;
};

// 현재 모든 할 일을 가져오는 함수
const getAllTodos = () => todos;

// 완료된 할 일을 가져오는 함수
const getAllCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted);
};

// 새로운 할 일을 추가하는 함수
const appendTodos = (text) => {
    const newId = id++;
    const newTodos = [...getAllTodos(), { id: newId, isCompleted: false, content: text }];
    setTodos(newTodos);
    paintTodos();
};

// 할 일을 삭제하는 함수 (완료 리스트에서도 삭제)
const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    paintTodos();
    paintCompletedTodos();
};

// 완료/미완료 토글 기능
const toggleComplete = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? Object.assign(Object.assign({}, todo), { isCompleted: !todo.isCompleted }) : todo);
    setTodos(newTodos);
    paintTodos();
    paintCompletedTodos();
};

// 해야 할 일 리스트 렌더링
const paintTodos = () => {
    todoListElem.innerHTML = '';
    getAllTodos()
        .filter(todo => !todo.isCompleted) // 완료되지 않은 할 일만 표시
        .forEach(todo => {
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item');
        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.innerText = todo.content;
        const checkBtnElem = document.createElement('button');
        checkBtnElem.classList.add('checkBtn');
        checkBtnElem.innerText = '완료'; // 완료 버튼
        checkBtnElem.addEventListener('click', () => toggleComplete(todo.id));
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(checkBtnElem);
        todoListElem.appendChild(todoItemElem);
    });
};

// 해낸 일 리스트 렌더링
const paintCompletedTodos = () => {
    todoListCompleted.innerHTML = '';
    getAllCompletedTodos().forEach(todo => {
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item', 'completed');
        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.innerText = todo.content;
        const deleteBtnElem = document.createElement('button');
        deleteBtnElem.classList.add('delBtn');
        deleteBtnElem.innerText = '삭제'; // 삭제 버튼
        deleteBtnElem.addEventListener('click', () => deleteTodo(todo.id));
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(deleteBtnElem);
        todoListCompleted.appendChild(todoItemElem);
    });
};

// 할 일 입력 처리 (Enter 또는 버튼 클릭)
const handleAddTodo = (e) => {
    e.preventDefault(); // 기본 동작(새로고침) 방지
    const newTodoText = todoInputElem.value.trim();
    if (newTodoText) {
        appendTodos(newTodoText);
        todoInputElem.value = ''; // 입력 필드 초기화
    }
};

// 초기화 (Enter 입력 및 버튼 클릭 시 할 일 추가)
const init = () => {
    const todoForm = document.querySelector('form');
    todoForm.addEventListener('submit', handleAddTodo);
};
init();