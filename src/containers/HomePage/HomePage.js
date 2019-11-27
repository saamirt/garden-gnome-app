import React from "react";
import { Helmet } from "react-helmet-async";

const HomePage = props => (
	<div className="container">
		<Helmet>
			<title>Home Page</title>
			<meta
				name="description"
				content="A React.js Boilerplate application"
			/>
		</Helmet>
		<h1 className="text-center">Home Page</h1>
	</div>
);

export default HomePage;
