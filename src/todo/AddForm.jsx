import React, { useState, useContext } from 'react';
import { Context } from '../context';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  btnAdd: {
    padding: "7px 22px",
    color: "green",
    borderColor: "green",
    marginLeft: "10px"
  },
  inputAdd: {
  	width: "100%"
  },
  form: {
  	display: "flex"
  }
});

function AddForm(){
	const [taskValue, setTaskValue] = useState('')
	const { addTodo } = useContext(Context);
	const classes = useStyles();

	const addBtnHandler = () => {
		if(taskValue !== ''){
			addTodo(taskValue);
			setTaskValue('');
		}
	}

	return(
		<form 
		className={classes.form} 
		action="submit" 
		onClick={(e) => e.preventDefault()}>
			<TextField 
			type="text"
			value={taskValue}
			onChange={(e) => setTaskValue(e.target.value)}
			label="Task"
			id="filled-size-small"
			variant="outlined"
			size="small"
			className={classes.inputAdd}
			/>
			<Button 
			type="submit" 
			onClick={addBtnHandler}
			variant="outlined"
			size="medium"
			className={classes.btnAdd}
			>
			ADD
			</Button>
		</form>
	)
}

export default AddForm;