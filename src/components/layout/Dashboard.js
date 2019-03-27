import React, { Component } from 'react';
import GnomeList from '../gnomes/GnomesList';

export default class Dashboard extends Component {
	render() {
		return (
			<div className="row">
				<div className="col">
					<GnomeList />
				</div>
			</div>
		);
	}
}
