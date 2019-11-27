import React from "react";
import { Link } from "react-router-dom";
import GnomeImage from "./../GnomeImage";

import "./style.scss";

const GnomeCard = ({ id, color = "#c1bbff" }) => {
	return (
		<div className="col-xl-4 card-col gnome-card-col">
			<Link
				to={`/gnome/${id}`}
				className="gnome-card card border-0 mx-auto mb-0"
			>
				<div className="row no-gutters align-items-center justify-content-between">
					<div className="card-body gnome-card__body">
						<h5 className="card-title gnome-card__title mb-0">
							Greenhouse
						</h5>
						<p className="card-text text-muted gnome-card__date mb-4 pb-2">
							Last updated 3 mins ago
						</p>
						<div className="card-text gnome-card__status row mx-auto">
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
					<div
						className="text-center my-auto"
						style={{ padding: "1.6rem", paddingRight: "2rem" }}
					>
						<div className="p-0 d-flex align-items-center justify-content-center">
							<GnomeImage color={color} />
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default GnomeCard;
