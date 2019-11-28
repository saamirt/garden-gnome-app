import React from "react";
import { Helmet } from "react-helmet-async";

const HomePage = props => (
	<div className="container">
		<Helmet>
			<title>Home Page</title>
		</Helmet>
		<h1 className="page__title text-center">Overview</h1>
	</div>
);

export default HomePage;
