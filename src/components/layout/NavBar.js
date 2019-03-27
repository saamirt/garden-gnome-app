import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-md navbar-light float-top py-4">
					<h1 href="." className="title-text navbar-brand mx-auto">
						Garden Gnome
					</h1>
				</nav>
			</div>
		);
	}
}
