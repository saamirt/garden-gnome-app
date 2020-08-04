import "./style.scss";

import React from "react";
import { Helmet } from "react-helmet-async";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import GnomeCard from "../../components/GnomeCard";
import AddGnomeCard from "../../components/AddGnomeCard";

//import * as actions from "../../store/actions/gnomeActions";

const GnomesPage = ({ loading, error, gnomes, userId }) => {
	//console.log(gnomes);
	return (
		<div className="container">
			<Helmet>
				<title>My Gnomes</title>
			</Helmet>
			<h1 className="page__title text-center">My Gnomes</h1>
			<div className="row">
				{!!gnomes &&
					gnomes
						.map((gnome, i) => (
							<GnomeCard
								key={i}
								id={gnome.id}
								name={gnome.name}
								color={gnome.color}
								is_connected={gnome.is_connected}
							/>
						))}
				<AddGnomeCard color={"#c1bbff"} />
			</div>
		</div>
	);
};

const mapStateToProps = ({ firebase, firestore, gnomes }) => {
	let userId = firebase.auth.uid;
	let user =
		firestore.data.users && firestore.data.users[userId];
	return {
		userId,
		gnomes:	user && Object.entries(user.gnomes).map((gnome) =>({
			...gnome[1],
			id: gnome[0],
		})),
		loading: gnomes.loading,
		error: gnomes.error
	};
};

const mapDispatchToProps = {};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(props => ["gnomes", `users/${props.userId}`])
)(GnomesPage);
