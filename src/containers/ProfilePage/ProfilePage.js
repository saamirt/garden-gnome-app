import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

import * as actions from "../../store/actions/authActions";

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

//makes setting and disappearing the success message thread-safe.
//prevents setting success to false while other calls are still going on
let semaphore = 0;

const ProfileSchema = Yup.object().shape({
	firstName: Yup.string()
		.required("Your first name is required.")
		.min(3, "Too short.")
		.max(25, "Too long."),
	lastName: Yup.string()
		.required("Your last name is required.")
		.min(3, "Too short.")
		.max(25, "Too long."),
	email: Yup.string()
		.email("Invalid email.")
		.required("The email is required.")
});

const PasswordSchema = Yup.object().shape({
	password: Yup.string()
		.min(8, "The password is too short.")
		.matches(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-,.]).{8,}$/
		)
		.required(),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required()
});

const ProfilePage = ({
	firebase,
	editProfile,
	loading,
	error,
	loadingDelete,
	errorDelete,
	deleteUser,
	cleanUp,
	changePassword,
	loadingPassword,
	errorPassword
}) => {
	const initialValues = {
		firstName: firebase.profile.firstName,
		lastName: firebase.profile.lastName,
		email: firebase.auth.email
	};
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		return () => {
			cleanUp();
		};
	}, [cleanUp, firebase.profile.isLoaded]);

	if (!firebase.profile.isLoaded) return null;
	return (
		<>
			<div className="container mt-5">
				<Helmet>
					<title>Profile</title>
					<meta
						name="description"
						content="A React.js Boilerplate application"
					/>
				</Helmet>
				{success ? (
					<div className="alert alert-primary" role="alert">
						Account details saved!
					</div>
				) : null}
				<div className="card p-5">
					<h1 className="text-center">Profile</h1>
					<Formik
						initialValues={initialValues}
						validationSchema={ProfileSchema}
						onSubmit={async (values, { setSubmitting }) => {
							// edit the profile here
							console.log("submitting edit profile");
							await editProfile(values).then(() => {
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
							setSubmitting(false);
						}}
					>
						{({
							values,
							isSubmitting,
							isValid,
							handleSubmit,
							handleChange
						}) => (
							<form onSubmit={handleSubmit}>
								<div className="form-row">
									<div className="col-md-6 mb-3">
										<label htmlFor="firstName">
											First name
										</label>
										<input
											type="text"
											className="form-control"
											id="firstName"
											name="firstName"
											placeholder="Enter first name"
											value={values.firstName}
											onChange={handleChange}
											required
										/>
										<div className="valid-feedback">
											Looks good!
										</div>
									</div>
									<div className="col-md-6 mb-3">
										<label htmlFor="lastName">
											Last name
										</label>
										<input
											type="text"
											className="form-control"
											id="lastName"
											name="lastName"
											placeholder="Enter last name"
											value={values.lastName}
											onChange={handleChange}
											required
										/>
										<div className="valid-feedback">
											Looks good!
										</div>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										placeholder="Enter email"
										value={values.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="w-100 text-center mt-3">
									<button
										disabled={
											!isValid ||
											isSubmitting ||
											JSON.stringify(values) ===
												JSON.stringify(initialValues)
										}
										type="submit"
										className="col-4 btn btn-primary m"
									>
										{loading ? "Saving..." : "Save"}
									</button>
								</div>
							</form>
						)}
					</Formik>
					<hr />
					<div className="w-100 text-center mt-3">
						<button
							disabled={loading}
							type="button"
							className="col-4 btn btn-primary"
							data-toggle="modal"
							data-target="#passwordModal"
						>
							Change Password
						</button>
					</div>
					<div className="w-100 text-center mt-3">
						<button
							disabled={loading}
							type="button"
							className="col-4 btn btn-primary"
							data-toggle="modal"
							data-target="#deleteModal"
						>
							Delete Account
						</button>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="passwordModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="passwordModalLabel"
				aria-hidden="true"
			>
				<div
					show={"" + success}
					className="modal-dialog"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="passwordModalLabel">
								Change Password
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<Formik
							initialValues={{
								password: "",
								confirmPassword: ""
							}}
							validationSchema={PasswordSchema}
							onSubmit={async (values, { setSubmitting }) => {
								await changePassword(values);
								setSubmitting(false);
							}}
						>
							{({
								values,
								isSubmitting,
								isValid,
								handleSubmit,
								handleChange
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="modal-body">
										<div className="form-group">
											<label htmlFor="password">
												Password
											</label>
											<input
												type="password"
												className="form-control"
												id="password"
												name="password"
												value={values.password}
												onChange={handleChange}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="confirmPassword">
												Confirm Password
											</label>
											<input
												type="password"
												className="form-control"
												id="confirmPassword"
												name="confirmPassword"
												value={values.confirmPassword}
												onChange={handleChange}
											/>
										</div>
										{errorPassword && (
											<small
												id="formError"
												className="form-text text-muted mt-3"
											>
												{errorPassword}
											</small>
										)}
									</div>
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-secondary"
											data-dismiss="modal"
										>
											No, Take me back
										</button>
										<button
											disabled={!isValid || isSubmitting}
											type="submit"
											className="col-4 btn btn-primary"
										>
											{loadingPassword
												? "Saving..."
												: "Save"}
										</button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="deleteModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="deleteModalLabel"
				aria-hidden="true"
			>
				<div
					show={"" + success}
					className="modal-dialog"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="deleteModalLabel">
								Are you sure you want to delete your account?
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							You will not be able to recover your account after
							deletion. Do you want to delete your account
							forever?
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal"
								onClick={() => {
									deleteUser();
								}}
							>
								Yes, Delete my account
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = ({ firebase, auth }) => ({
	firebase,
	loading: auth.profileEdit.loading,
	error: auth.profileEdit.error,
	loadingDelete: auth.deleteUser.loading,
	errorDelete: auth.deleteUser.error,
	loadingPassword: auth.changePassword.loading,
	errorPassword: auth.changePassword.error
});

const mapDispatchToProps = {
	editProfile: actions.editProfile,
	changePassword: actions.changePassword,
	cleanUp: actions.clean,
	deleteUser: actions.deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
