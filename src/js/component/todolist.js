import React, { useState, useEffect } from "react";
import TodoForm from "./todoform";
import Todo from "./todo";

function TodoList() {
	const [todos, setTodos] = useState([]);
	const [tareas, setTareas] = useState([]);
	const [falso, setFalso] = useState(0);
	const [verdadero, setVerdadero] = useState(0);

	/* 	useEffect(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/kao-hurtado")
				.then((response) => response.json())
				.then((result) => console.log(result))
				.catch((error) => console.log("error", error));
		}, []); */

	useEffect(() => {
		// Actualiza el título del documento usando la API del navegador
		loadTodo();
		//contarTodo();
	}, ["loadTodo"]);

	let url = "https://assets.breatheco.de/apis/fake/todos/user/kao-hurtado";

	const loadTodo = async () => {
		let contar = 0;
		await fetch(url, {
			method: "Get",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				setTareas(data);
				console.log({ data });

				for (let i = 0; i < data.length; i++) {
					if (data[i].done == false) {
						contar++;
					}
				}
				setFalso(contar);
				setVerdadero(data.length - contar);
			})
			.catch((error) => console.error("Error:", error.message));
	};

	const newUser = () => {
		let array = [];
		fetch(url, {
			method: "Post",
			body: JSON.stringify(array),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				loadTodo();
			});
	};

	const updatetodo = (tareas) => {
		fetch(url, {
			method: "Put",
			body: JSON.stringify(tareas),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				loadTodo();
				alert(data.result);
			});
	};

	const deletetodo = (tareas) => {
		fetch(url, {
			method: "delete",
			body: "",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.result);
			})
			.catch((error) => console.log("error", error));
	};

	const validateTask = () => {
		if (todos === "")
			alert("Debe ingresar algún valor para agregar la tarea");
		else {
			let nuevo = {
				label: todos,
				done: false,
			};
			tareas.push(nuevo);
			//alert("Tarea agregada Satisfactoriamente");
			console.log(tareas);
			updatetodo(tareas);
			loadTodo();
			setTodos("");
		}
	};

	const doneTask = (index) => {
		//alert(index);
		let newList = tareas;

		let item = newList[index];
		item.done = false;
		console.log(newList);
		//setTareas([...newList]);
		updatetodo(newList);
	};

	const addTodo = (todo) => {
		if (!todo.text || /^\s*$/.test(todo.text)) {
			return;
		}

		const newTodos = [todo, ...todos];

		setTodos(newTodos);
		/* console.log(...todos); */
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}

		setTodos((prev) =>
			prev.map((item) => (item.id === todoId ? newValue : item))
		);
	};

	const removeTodo = (id) => {
		const removeArr = [...todos].filter((todo) => todo.id !== id);

		setTodos(removeArr);
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	return (
		<div>
			<h1>Todo List React</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
			<p className="card-text text-left ml-2">
				<small className="text-muted">{falso} task ready</small>
			</p>
		</div>
	);
}

export default TodoList;
