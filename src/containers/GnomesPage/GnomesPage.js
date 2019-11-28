import "./style.scss";

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import GnomeCard from "../../components/GnomeCard";
import AddGnomeCard from "../../components/AddGnomeCard";

import * as actions from "../../store/actions/gnomeActions";

const GnomesPage = ({ loading, error, gnomes, userId }) => {
	return (
		<div className="container">
			<Helmet>
				<title>My Gnomes</title>
			</Helmet>
			<h1 className="page__title text-center">My Gnomes</h1>
			<div className="row">
				{gnomes &&
					gnomes[userId] &&
					gnomes[userId].gnomes &&
					gnomes[userId].gnomes
						.slice(0)
						.map((gnome, i) => (
							<GnomeCard
								key={i}
								id={i}
								name={gnome.name}
								color={gnome.color}
							/>
						))}
				<AddGnomeCard color={"#c1bbff"} />
			</div>
		</div>
	);
};

const mapStateToProps = ({ firebase, firestore, gnomes }) => ({
	userId: firebase.auth.uid,
	gnomes: firestore.data.gnomes,
	loading: gnomes.loading,
	error: gnomes.error
});

const mapDispatchToProps = {};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(props => [`gnomes/${props.userId}`])
)(GnomesPage);
