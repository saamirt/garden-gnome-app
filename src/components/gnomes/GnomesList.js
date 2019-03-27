import React, { Component } from 'react';
import axios from 'axios';
import GnomeCard from './GnomeCard';

export default class GnomesList extends Component {
	state = {
		url: 'https://pokeapi.co/api/v2/pokemon/',
		gnomeList: null
	};

	async componentDidMount() {
		const res = await axios.get(this.state.url);
		this.setState({
			gnomeList: res.data['results'].slice(0, 6).map(g => {
				let c1 = ['8CFF66', 'FF4A4A', '435AFF', 'B14DFF', 'FFFF6C'][
					Math.floor(Math.random() * 5)
				];
				let c2 = ['8CFF66', 'FF4A4A', '435AFF', 'B14DFF', 'FFFF6C'][
					Math.floor(Math.random() * 5)
				];
				while (c2 === c1) {
					c2 = ['8CFF66', 'FF4A4A', '435AFF', 'B14DFF', 'FFFF6C'][
						Math.floor(Math.random() * 5)
					];
				}
				return Object.assign(g, {
					gnomeIcon: {
						primColor: c1,
						secColor: c2,
						beardColor: [
							'FF954D',
							'E2E2E2',
							'934118',
							'C46937',
							'FFFF6C'
						][Math.floor(Math.random() * 5)],
						skinColor: 'ffe2cc'
					}
				});
			})
		});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.gnomeList ? (
					<div className="row">
						{this.state.gnomeList.map(gnome => (
							<GnomeCard
								key={gnome.name}
								name={gnome.name}
								url={gnome.url}
								gnomeIcon={gnome.gnomeIcon}
							/>
						))}
					</div>
				) : (
					<h1>Loading Gnomes...</h1>
				)}
			</React.Fragment>
		);
	}
}
