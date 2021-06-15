import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  changedInput: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "none",
    fontSize: 16,
    fontWeight: 600,
    padding: "6px 6px 0 0",
    borderBottom: "2px solid blue",
    marginLeft: "6px"
  },
  changedBtn: {
  	width: "100%",
  	border: "none",
    outline: "none",
    background: "none",
    textAlign: "left",
    fontSize: 16,
    fontWeight: 600,
    padding: "6px 6px 0 0",
    borderBottom: "2px solid transparent",
    marginLeft: "6px"
  },
  inputWrapper: {
  	display: "flex",
  	width: "100%",
  	height: 40
  }
});

function Input({ todo }) {
	const { editTodo } = useContext(Context);
	const [value, setValue] = useState(todo.title || '');
	const [showBtn, setShowBtn] = useState(true)
	const ref = useRef(null);
	const classes = useStyles();

	const onKeyDownHandler = (e) =>{
		if(e.keyCode === 13 & value !== ''){
			editTodo(value, todo);
			showHandler();
		}
	}
	const btnHandler =  async () => {
		await setShowBtn(false);
		focusInput();
	}
	const showHandler = () => {
		setShowBtn(true);
	}
	const focusInput = () => {
		ref.current.focus();
	}
	return(
		<div className={classes.inputWrapper}>
			<input 
			type="button" 
			style={showBtn ? {'display': 'block'} : {'display': 'none'}}
			value={value}
			onClick={btnHandler}
			className={classes.changedBtn}
			/>
			<input 
			type="text" 
			style={showBtn ? {'display': 'none'} : {'display': 'block'}}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyDown={onKeyDownHandler}
			ref={ref}
			className={classes.changedInput}
			/>
		</div>
	)
}

Input.propTypes = {
	todo: PropTypes.object
}

export default Input;