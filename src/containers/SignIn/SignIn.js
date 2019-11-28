import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import * as actions from "../../store/actions/authActions";
import { connect } from "react-redux";

import styled from "styled-components";
// import googleLogo from "./images/btn_google_white_normal_ios.svg";

const Divider = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	&:before,
	&:after {
		content: "";
		flex: 1;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}
	&:before {
		margin-right: 0.25em;
	}
	&:after {
		margin-left: 0.25em;
	}
	// text-align: center;
	// &:before {
	// 	content: "";
	// 	position: relative;
	// 	width: 47%;
	// 	background-color: rgba(0, 0, 0, 0.2);
	// 	display: inline-block;
	// 	height: 1px;
	// 	vertical-align: middle;
	// 	margin-right: 1em;
	// }
	// &:after {
	// 	content: "";
	// 	position: relative;
	// 	width: 47%;
	// 	background-color: rgba(0, 0, 0, 0.2);
	// 	display: inline-block;
	// 	height: 1px;
	// 	vertical-align: middle;
	// 	margin-left: 1em;
	// }
`;

const SignIn = ({
	login,
	loginGoogle,
	loginGithub,
	loading,
	error,
	cleanUp
}) => {
	const [form, setForm] = useState({
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
		if (!form.email.trim() || !form.password.trim()) return;
		await login(form).then(() => {
			console.log(error);
		});
	};

	return (
		<div className="container">
			<Helmet>
				<title>Sign In</title>
			</Helmet>
			{error ? (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			) : null}
			<h1 className="page__title text-center">Sign In</h1>
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
			<Divider className="my-2">
				<span>or</span>
			</Divider>
			<div className="w-100 text-center mt-3">
				<button
					disabled={loading}
					type="submit"
					className="btn btn-primary"
					onClick={async () => {
						await loginGoogle();
					}}
				>
					<div className="d-inline-block h-100 align-middle">
						{/* <img
							src={googleLogo}
							style={{ paddingBottom: "0.3em" }}
							className="h-100 align-middle mr-1"
						/> */}
					</div>
					Login with Google
				</button>
			</div>
			<div className="w-100 text-center mt-3">
				<button
					disabled={loading}
					type="submit"
					className="btn btn-primary"
					onClick={async () => {
						await loginGithub();
					}}
				>
					<div className="d-inline-block h-100 align-middle">
						{/* <img
							src={googleLogo}
							style={{ paddingBottom: "0.3em" }}
							className="h-100 align-middle mr-1"
						/> */}
					</div>
					Login with Github
				</button>
			</div>
		</div>
	);
};
const mapStateToProps = ({ auth }) => ({
	loading: auth.loading,
	error: auth.error
});
const mapDispatchToProps = {
	login: actions.signIn,
	loginGoogle: actions.signInWithGoogle,
	loginGithub: actions.signInWithGithub,
	cleanUp: actions.clean
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
