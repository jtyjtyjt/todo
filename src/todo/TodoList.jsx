import React, { useEffect, useState } from 'react';
import env from "react-dotenv"; // have rule in package for variable(API_URL)
import axios from 'axios';
import { Context } from '../context';
import TodoItem from './TodoItem';
import AddForm from './AddForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  todoList: {
  	display: "flex",
  	flexDirection: "column",
  	width: "500px",
  	margin: "25vh auto 0 auto"
  }
});

const instance = axios.create({
	baseURL: `${ env.API_URL }/`
});

function TodoList(){
	const [todos, setTodos] = useState(0);
	const classes = useStyles();

	const getAllTodos = () => {
		instance.get(`todos`)
		.then(res => setTodos(res.data.reverse()))
		.catch(err => console.log(err));
	};

	const addTodo = (value) => {
		const newTask = {
			id: Math.random().toString(36).slice(2),
			title: value,
			completed: false
		};
		instance.post(`todos`, newTask)
		.then(res => {
			setTodos([newTask, ...todos]);
			//console.log(res.data)
		})
		.catch(err => console.log(err));
	};

	const editTodo = (value, todo) => {
		instance.put(`todos/${todo.id}`, { title: value, completed: todo.completed })
		.then(res => {
			setTodos(todos.map(item => {
				if(item.id === todo.id) item.title = value;
				return item;
			}))
			//console.log(res.data)
		})
		.catch(err => console.log(err));
	};

	const deleteTodo = (id) => {
		instance.delete(`todos/${id}`)
		.then(res => {
			setTodos(todos.filter(item => item.id !== id));
			//console.log(res.data)
		})
		.catch(err => console.log(err));
	};

	const checkedTodo = (todo) => {
		instance.put(`todos/${todo.id}`, {
			completed: !todo.completed,
			title: todo.title
		})
		.then(res => {
			setTodos(todos.map(item => {
				if(item.id === todo.id) item.completed = !todo.completed;
				return item;
			}))
			//console.log(res.data)
		})
		.catch(err => console.log(err));
	};

	useEffect(() => getAllTodos(), []);
	
	return(
		<Context.Provider value={{ addTodo, editTodo, deleteTodo, checkedTodo }}>
			<div className={classes.todoList}>
				<AddForm />
				{Array.isArray(todos) && todos.map(todo => {
					return <TodoItem todo={todo} key={todo.id}/>
				}) }
			</div>
		</Context.Provider>
	)
}

export default TodoList;