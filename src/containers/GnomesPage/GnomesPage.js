import "./style.scss";

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import GnomeCard from "../../components/GnomeCard";
import AddGnomeCard from "../../components/AddGnomeCard";

import * as actions from "../../store/actions/gnomeActions";

const GnomesPage = ({}) => {
	const colors = ["#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff"];

	return (
		<div className="container">
			<Helmet>
				<title>My Gnomes</title>
			</Helmet>
			<h1 className="page__title text-center">My Gnomes</h1>
			<div className="row">
				{[...Array(5)].map((elem, i) => (
					<GnomeCard key={i} id={i} color={"#c1bbff"} />
				))}
				<AddGnomeCard color={"#c1bbff"} />
			</div>
		</div>
	);
};

const mapStateToProps = state => {};

const mapDispatchToProps = {};

export default connect(null, null)(GnomesPage);
