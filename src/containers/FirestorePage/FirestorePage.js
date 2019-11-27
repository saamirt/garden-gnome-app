import React from "react";
import { Helmet } from "react-helmet-async";

const FirestorePage = props => (
	<div className="container">
		<Helmet>
			<title>Firestore Page</title>
			<meta
				name="description"
				content="A React.js Boilerplate application"
			/>
		</Helmet>
		<h1 className="text-center">Firestore Page</h1>
	</div>
);

export default FirestorePage;
