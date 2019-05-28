import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
			<footer
				className="footer fixed-bottom bg-dark"
				style={{ zIndex: 0 }}
			>
				<a
					href="https://github.com/saamirt/IOT-Garden-Gnome"
					className="text-secondary"
					style={{
						paddingLeft: '4rem'
					}}
				>
					Check out this project on GitHub
				</a>
			</footer>
		);
	}
}
