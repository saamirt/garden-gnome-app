import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<footer className="footer fixed-bottom py-3 bg-dark">
					<div className="mx-5">
						<a
							href="https://github.com/saamirt/IOT-Garden-Gnome"
							className="text-secondary font-italic"
						>
							Check out this project on GitHub
						</a>
					</div>
				</footer>
			</div>
		);
	}
}
