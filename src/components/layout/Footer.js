import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
			<footer className="footer fixed-bottom bg-dark">
				<a
					href="https://github.com/saamirt/IOT-Garden-Gnome"
					className="text-secondary font-italic"
				>
					Check out this project on GitHub
				</a>
			</footer>
		);
	}
}
