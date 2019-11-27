import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import * as actions from "../../store/actions/authActions";
import { connect } from "react-redux";

const SignUp = ({ signUp, loading, error, cleanUp }) => {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	});

	useEffect(() => {
		return () => {
			cleanUp();
		};
	}, [cleanUp]);

	const handleInputChange = event => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const id = target.id;

		setForm({ ...form, [id]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (
			!form.firstName.trim() ||
			!form.lastName.trim() ||
			!form.email.trim() ||
			!form.password.trim()
		)
			return;
		await signUp(form);
	};

	return (
		<div className="container">
			<Helmet>
				<title>Sign Up</title>
				<meta
					name="description"
					content="A React.js Boilerplate application"
				/>
			</Helmet>
			<h1>Sign Up</h1>
			<form
				// onSubmit={async (values, { setSubmitting }) => {
				// 	console.log(values);
				// 	console.log(setSubmitting);
				// 	await login(values);
				// 	setSubmitting(false);
				// }}
				onSubmit={handleSubmit}
			>
				<div className="form-group">
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						className="form-control"
						id="firstName"
						placeholder="Enter First name"
						onChange={handleInputChange}
						value={form.firstName}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						className="form-control"
						id="lastName"
						placeholder="Enter Last name"
						onChange={handleInputChange}
						value={form.lastName}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						onChange={handleInputChange}
						value={form.email}
						required
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Password"
						onChange={handleInputChange}
						value={form.password}
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
			{error && (
				<small id="formError" className="form-text text-muted mt-3">
					{error}
				</small>
			)}
		</div>
	);
};
const mapStateToProps = ({ auth }) => ({
	loading: auth.loading,
	error: auth.error
});
const mapDispatchToProps = {
	signUp: actions.signUp,
	cleanUp: actions.clean
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
