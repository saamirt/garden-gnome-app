import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import GnomeCard from "../../components/GnomeCard";

import * as actions from "../../store/actions/gnomeActions";

const GnomeDetailsPage = ({}) => {
	const colors = ["#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff", "#c1bbff"];

	return (
		<div className="container mt-5">
			<Helmet>
				<title>Gnome data</title>
			</Helmet>
		</div>
	);
};

const mapStateToProps = state => {};

const mapDispatchToProps = {};

export default connect(null, null)(GnomeDetailsPage);
