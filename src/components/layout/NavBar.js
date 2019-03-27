import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark float-top fixed-top">
					<h1 className="navbar-brand text-muted">
						Garden Gnome
					</h1>
				</nav>
			</div>
		);
	}
}
