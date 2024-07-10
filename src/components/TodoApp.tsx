import React, { useState, useMemo } from 'react';
//import './TodoApp.css';
import styled from 'styled-components';

const TodoComponent = styled.div`
  background-color: #ce80ca;
  width: 300px;
  min-height: 200px;
  margin: 30px auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 20px;
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;

  input[type='text'],
  select,
  button {
    margin-right: 10px;
    margin-bottom: 5px;
  }
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  .completed {
    text-decoration: line-through;
    color: #aaa;
  }

  .remove-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 10px;
  }
`;

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
    if (newTodo !== '' && selectedLocation !== '') {
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

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => b.jobInfo.priority - a.jobInfo.priority);
  }, [todos]);

  return (
    <TodoComponent className="todo-app">
      <h1>Todo App</h1>
      <Options className="add-todo">
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
      </Options>
      <TableContainer className="todo-table">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Location</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo) => (
            <tr key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <td>{todo.jobInfo.job}</td>
              <td>{todo.jobInfo.location}</td>
              <td>{todo.jobInfo.priority}</td>
              <td>
                <button className="remove-btn" onClick={() => removeTodo(todo.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </TodoComponent>
  );
};

export default TodoApp;
