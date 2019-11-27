import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";

import * as actions from "../../store/actions/todoActions";

//makes setting and disappearing the success message thread-safe.
//prevents setting success to false while other calls are still going on
let semaphore = 0;

const AddTodoPage = ({ addTodo, loading, error }) => {
	const [form, setForm] = useState({ title: "", content: "" });
	const [success, setSuccess] = useState(false);

	const handleInputChange = e => {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const id = target.id;

		setForm({ ...form, [id]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (!(form.title.trim() && form.content.trim())) return;
		await addTodo(form).then(() => {
			if (!error) {
				semaphore += 1;
				setSuccess(true);
				setTimeout(() => {
					semaphore -= 1;
					if (semaphore < 1) {
						setSuccess(false);
					}
				}, 3000);
			}
		});
		setForm({ title: "", content: "" });
	};

	return (
		<div className="container mt-5">
			<Helmet>
				<title>Add Todo</title>
				<meta
					name="description"
					content="A React.js Boilerplate application"
				/>
			</Helmet>
			{success ? (
				<div className="alert alert-primary" role="alert">
					New project submitted!
				</div>
			) : null}
			<div className="card p-5">
				<h1 className="text-center">Add Todo</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="title"
							className="form-control"
							id="title"
							placeholder="Enter title"
							onChange={handleInputChange}
							value={form.title}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="content">Content</label>
						<input
							type="content"
							className="form-control"
							id="content"
							placeholder="Content"
							onChange={handleInputChange}
							value={form.content}
							required
						/>
					</div>
					<button
						disabled={loading}
						type="submit"
						className="btn btn-primary"
					>
						{loading ? "Loading..." : "Submit"}
					</button>
				</form>
				{/* {(error || success) && (
					<small id="formError" className="form-text text-muted mt-3">
						{error || "Successfully added a new item!"}
					</small>
				)} */}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	const { todos } = state;
	return {
		loading: todos.loading,
		error: todos.error
	};
};

const mapDispatchToProps = {
	addTodo: actions.addTodo,
	editTodoAction: actions.editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoPage);
