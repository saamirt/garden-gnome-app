import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { connect, useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

import Header from "./components/Header";
import Loader from "./components/Loader";

import HomePage from "./containers/HomePage/HomePage";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import Logout from "./containers/Logout/Logout";
// import TodosPage from "./containers/TodosPage/TodosPage";
import AddTodoPage from "./containers/AddTodoPage/AddTodoPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import VerifyEmailPage from "./containers/VerifyEmailPage/VerifyEmailPage";
import GnomesPage from "./containers/GnomesPage/GnomesPage";
import GnomeDetailsPage from "./containers/GnomeDetailsPage/GnomeDetailsPage";
const TodosPage = React.lazy(() => import("./containers/TodosPage/TodosPage"));

const App = ({ loggedIn, emailVerified }) => {
	const auth = useSelector(state => state.firebase.auth);

	let routes = loggedIn ? (
		emailVerified ? (
			<Suspense fallback={Loader()}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/gnomes" component={GnomesPage} />
					<Route
						exact
						path="/gnome/:id"
						component={GnomeDetailsPage}
					/>
					<Route exact path="/profile" component={ProfilePage} />
					<Route exact path="/logout" component={Logout} />
					<Redirect path="/signin" to="/" />
					<Redirect to="/" />
				</Switch>
			</Suspense>
		) : (
			<Switch>
				<Route exact path="/verify-email" component={VerifyEmailPage} />
				<Route exact path="/logout" component={Logout} />
				<Redirect to="/verify-email" />
			</Switch>
		)
	) : (
		<Switch>
			<Route exact path="/signin" component={SignIn} />
			<Route exact path="/signup" component={SignUp} />
			<Redirect to="/signin" />
		</Switch>
	);

	return (
		<BrowserRouter>
			<HelmetProvider>
				<Helmet
					titleTemplate="%s - React Firebase Starer"
					defaultTitle="React Firebase Starter"
				>
					<meta
						name="description"
						content="A basic boilerplate for future react apps"
					/>
				</Helmet>

				{!isLoaded(auth) ? (
					<Loader />
				) : (
					<>
						<Header
							loggedIn={loggedIn}
							emailVerified={emailVerified}
						/>
						<div className="page">{routes}</div>
					</>
				)}
			</HelmetProvider>
		</BrowserRouter>
	);
};

const mapStateToProps = ({ firebase }) => ({
	loggedIn: firebase.auth.uid,
	emailVerified: firebase.auth.emailVerified
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
