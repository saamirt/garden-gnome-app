import React from "react";
import { Link } from "react-router-dom";
import GnomeImage from "./../GnomeImage";

import "./style.scss";

const GnomeCard = ({ id, name = "Unknown Gnome", color = "#c1bbff", is_connected = false }) => {
	let path = is_connected?`/gnome/${name}`:`connectgnome`;
	let statusColor = is_connected?"#9FFF97":"#ff0000"
	return (
		<div className="col-xl-4 card-col gnome-card-col">
			<Link
				to={{
					pathname:path,
					state:{id, name}
				}}
				className="gnome-card card border-0 mx-auto mb-0"
			>
				<div className="row no-gutters align-items-center justify-content-between gnome-card-row">
					<div className="card-body gnome-card__body">
						<h5 className="card-title gnome-card__title mb-0">
							{name}
						</h5>
						<p className="card-text text-muted gnome-card__date mb-4">
							Last updated 3 mins ago
						</p>
						<div className="card-text gnome-card__status row mx-auto">
							<div
								className="my-auto rounded-pill"
								style={{
									width: "15px",
									height: "7px",
									backgroundColor: statusColor,
									marginRight: "7px"
								}}
							></div>
							active
						</div>
					</div>
					<div
						className="text-center my-auto p-0"
						// style={{ padding: "1.6rem", paddingRight: "2rem" }}
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
