import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import * as actions from "../../store/actions/authActions";

//makes setting and disappearing the success message thread-safe.
//prevents setting success to false while other calls are still going on
let semaphore = 0;

const VerifyEmailPage = ({
	verifyEmail,
	error,
	loading,
	cleanUp,
	firebase
}) => {
	const [success, setSuccess] = useState(false);
	const {
		auth: { emailVerified }
	} = firebase;
	useEffect(() => {
		if (emailVerified) {
			console.log("Email is verified!");
		}
		return () => {
			cleanUp();
		};
	}, [cleanUp, emailVerified]);

	return (
		<div className="container">
			<Helmet>
				<title>Verify Email</title>
				<meta
					name="description"
					content="A React.js Boilerplate application"
				/>
			</Helmet>
			{error ? (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			) : null}
			{!error && success ? (
				<div className="alert alert-primary" role="alert">
					Verification email sent!
				</div>
			) : null}
			<div className="card text-center">
				<div className="card-body">
					<h5 className="card-title">
						{emailVerified
							? "Your email is already verified"
							: "You must verify your email to continue"}
					</h5>
					{emailVerified ? null : (
						<p className="card-text">
							Check your inbox for a verification email.
						</p>
					)}
					<button
						onClick={() =>
							verifyEmail().then(() => {
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
							})
						}
						className="btn btn-primary"
						disabled={loading || emailVerified}
					>
						{loading ? "sending..." : "Resend Email"}
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth, firebase }) => ({
	firebase,
	loading: auth.verifyEmail.loading,
	error: auth.verifyEmail.error
});

const mapDispatchToProps = {
	verifyEmail: actions.verifyEmail,
	cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage);
