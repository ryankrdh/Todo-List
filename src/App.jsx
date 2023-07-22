import { useEffect, useState } from 'react';
import './styles.css';
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';

export default function App() {
	const [todos, setTodos] = useState(() => {
		try {
			const localValue = localStorage.getItem('ITEMS');
			if (localValue === null) return [];

			return JSON.parse(localValue);
		} catch (error) {
			console.error('Error parsing local storage data:', error);
			return [];
		}
	});

	// Anytime the [todos] change. run the function inside useEffect()
	useEffect(() => {
		localStorage.setItem('ITEMS', JSON.stringify(todos));
	}, [todos]);

	function addTodo(title) {
		setTodos((currentTodos) => {
			return [
				...currentTodos,
				{ id: crypto.randomUUID(), title, completed: false },
			];
		});
	}

	function toggleTodo(id, completed) {
		setTodos((currentTodos) => {
			return currentTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed };
				}

				return todo;
			});
		});
	}

	function deleteTodo(id) {
		setTodos((currentTodos) => {
			return currentTodos.filter((todo) => todo.id !== id);
		});
	}

	return (
		<>
			<NewTodoForm onSubmit={addTodo} />
			<h1 className="header">Todo List</h1>
			<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
		</>
	);
}
