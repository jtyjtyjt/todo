import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { Context } from '../context';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  todoItem: {
    display: "flex",
    width: "100%"
  },
  btnDelete: {
  	color: "red"
  }
});

function TodoItem({ todo }){
	const { deleteTodo, checkedTodo } = useContext(Context);
	const classes = useStyles();

	return(
		<li className={classes.todoItem}>
			<Checkbox 
			type="checkbox" 
			onChange={() => checkedTodo(todo)}
			checked={todo.completed}
			/>
			<Input todo={todo}/>
			<IconButton 
			onClick={() => deleteTodo(todo.id)}
			className={classes.btnDelete}
			>
			<CloseIcon />
			</IconButton>
		</li>
	)
}

TodoItem.propTypes = {
	todo: PropTypes.object
}
export default TodoItem;