import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { compose } from "redux";
import { connect } from "react-redux";

import { firestoreConnect } from "react-redux-firebase";

import * as actions from "../../store/actions/todoActions";

//These are just for current styling - feel free to remove
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

const StyledTitle = styled.textarea`
	width: 100%;
	border: none;
	height: 28px;
	font-size: 1.25rem;
	font-weight: 500;
	line-height: 1.2;
	resize: none;
	overflow: hidden;
`;

const StyledContent = styled(TextareaAutosize)`
	width: 100%;
	border: none;
	height: 28px;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.2;
	resize: none;
	overflow: hidden;
`;

let ref = null;

//makes setting and disappearing the success message thread-safe.
//prevents setting success to false while other calls are still going on
let delSemaphore = 0;
let editSemaphore = 0;

const TodosPage = ({ loading, error, todos, userId, editTodo, deleteTodo }) => {
	const [del, setDel] = useState(false);
	const [edit, setEdit] = useState(false);

	const handleKeyPress = e => {
		if (e.key === "Enter") e.preventDefault();
	};

	const handleInputChange = (event, id, field) => {
		ref = { target: event.target, id, field };
	};

	const handleDelete = id => {
		deleteTodo(id).then(() => {
			if (!error) {
				delSemaphore += 1;
				setDel(true);
				setTimeout(() => {
					delSemaphore -= 1;
					if (delSemaphore < 1) {
						setDel(false);
					}
				}, 2000);
			}
		});
	};

	useEffect(() => {
		const handleClickOutside = async event => {
			if (ref && ref.target && !ref.target.contains(event.target)) {
				let todo = todos[userId].todos.find(x => x.id === ref.id);
				if (ref.target.value.trim() === todo[ref.field]) return;
				console.log(`Setting title to : ${ref.target.value}`);
				await editTodo(ref.id, {
					...todo,
					[ref.field]: ref.target.value.trim()
				}).then(() => {
					if (!error) {
						editSemaphore += 1;
						setEdit(true);
						setTimeout(() => {
							editSemaphore -= 1;
							if (editSemaphore < 1) {
								setEdit(false);
							}
						}, 2000);
					}
				});
				ref = null;
			}
		};
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [todos, editTodo, error, userId]);

	return (
		<div className="container mt-5">
			<Helmet>
				<title>Todos</title>
				<meta
					name="description"
					content="A React.js Boilerplate application homepage"
				/>
			</Helmet>
			<h1 className="text-center mb-4">Todos</h1>
			{edit ? (
				<div className="alert alert-primary" role="alert">
					Item Edited!
				</div>
			) : null}
			{del ? (
				<div className="alert alert-danger" role="alert">
					Item Deleted!
				</div>
			) : null}

			<div className="list-group">
				{todos &&
					todos[userId] &&
					todos[userId].todos &&
					todos[userId].todos
						.slice(0)
						.reverse()
						.map(todo => (
							<div
								key={`project-${todo.id}`}
								href="#"
								className="list-group-item mb-4"
							>
								<div className="d-flex w-100 justify-content-between">
									<StyledTitle
										className="mb-1"
										onChange={e =>
											handleInputChange(
												e,
												todo.id,
												"title"
											)
										}
										defaultValue={todo.title}
										onKeyPress={handleKeyPress}
									/>
									<button
										type="button"
										className="close"
										data-dismiss="alert"
										aria-label="Close"
										onClick={() => handleDelete(todo.id)}
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<StyledContent
									className="mb-1"
									onChange={e =>
										handleInputChange(e, todo.id, "content")
									}
									defaultValue={todo.content}
									onKeyPress={handleKeyPress}
								/>
							</div>
						))}
			</div>
		</div>
	);
};

const mapStateToProps = ({ firebase, firestore, todos }) => ({
	userId: firebase.auth.uid,
	todos: firestore.data.todos,
	loading: todos.loading,
	error: todos.error
});

const mapDispatchToProps = {
	editTodo: actions.editTodo,
	deleteTodo: actions.deleteTodo
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(props => [`todos/${props.userId}`])
)(TodosPage);
