import "./style.scss";

import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";

const Header = ({ loggedIn, emailVerified }) => {
	const links = loggedIn
		? emailVerified
			? [
					{ path: "/gnomes", text: "My Gnomes" },
					{ path: "/addgnome", text: "Add Gnomes" },
					{ path: "/profile", text: "Profile" },
					{ path: "/logout", text: "Log Out" }
			  ]
			: [{ path: "/logout", text: "Logout" }]
		: [
				{ path: "/signin", text: "Sign In" },
				{ path: "/signup", text: "Sign Up" }
		  ];

	return (
		<>
			<nav className="header navbar navbar-expand-lg mx-4 p-0 px-3">
				<NavLink to="/" activeClassName="active" className="" href="#">
					<Logo />
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav ml-auto">
						{links.map(i => (
							<li key={i.path} className="nav-item">
								<NavLink
									to={i.path}
									activeClassName="active"
									className="nav-link p-0 header__link"
									href="#"
								>
									{i.text}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Header;
