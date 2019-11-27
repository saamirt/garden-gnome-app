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
				<title>Add Todo</title>
			</Helmet>
			<div className="row">
				<div className="col-xl-4 card-col">
					<div className="card border-0 mx-auto">
						<div className="row no-gutters align-items-center justify-content-between">
							<div className="card-body">
								<h5 className="card-title mb-0">Greenhouse</h5>
								<p className="card-text text-muted mb-4 pb-2">
									Last updated 3 mins ago
								</p>
								<div className="card-text gnome-status row mx-auto">
									<div
										className="my-auto rounded-pill"
										style={{
											width: "20px",
											height: "11px",
											backgroundColor: "#9FFF97",
											marginRight: "7px"
										}}
									></div>
									active
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {};

const mapDispatchToProps = {};

export default connect(null, null)(GnomeDetailsPage);
