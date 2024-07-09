import React, { useState } from 'react';
import './TodoApp.css'; // Import CSS file for TodoApp styles

interface JobInfo {
  job: string;
  location: string;
  priority: number;
}

interface TodoItem {
  id: string;
  jobInfo: JobInfo;
  completed: boolean;
}

let locations: { label: string}[] = [
  {label:'inside'},
  {label:'outside'},
  {label:'other'}     
];

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priority, setPriority] = useState<number>(0);

  const addTodo = () => {
    if (newTodo !== '') {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        completed: false,
        jobInfo: {
          job: newTodo,
          location: selectedLocation,
          priority: priority,
        },
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(parseInt(e.target.value, 10));
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)} 
        >
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location.label}>
              {location.label}
            </option>
          ))}
        </select>
        <div className="slider">
        <label htmlFor="priority-slider">Priority:</label>
        <input
          type="range"
          id="priority-slider"
          min="0"
          max="10"
          value={priority}
          onChange={handlePriorityChange}
        />
        <span>{priority}</span>
        </div>
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span className="todo-text">{todo.jobInfo.job}</span>
            <span className="todo-location">Location: {todo.jobInfo.location}</span>
            <span className="todo-priority">Priority: {todo.jobInfo.priority}</span>
            <button className="remove-btn" onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
