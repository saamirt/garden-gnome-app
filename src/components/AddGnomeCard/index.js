import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "./images/plus.svg";

import "./style.scss";

const AddGnomeCard = () => {
	return (
		<div className="col-xl-4 card-col gnome-card-col">
			<Link
				to={"/addgnome"}
				className="gnome-card card mx-auto mb-0 add-gnome-card"
			>
				<img src={plusIcon} className="add-gnome-card__plus" />
			</Link>
		</div>
	);
};

export default AddGnomeCard;
