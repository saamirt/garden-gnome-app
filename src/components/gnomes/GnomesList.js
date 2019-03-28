import React, { Component } from 'react';
import axios from 'axios';
import GnomeCard from './GnomeCard';

export default class GnomesList extends Component {
	state = {
		name: '',
		url: 'https://pokeapi.co/api/v2/pokemon/',
		gnomeList: null,
		gnome: null
	};

	async componentDidMount() {
		const res = await axios.get(this.state.url);

		this.setState({
			gnomeList: res.data['results'].slice(0, 6).map(g => {
				let c1 = ['ffffff', 'ff7373', '6779ff'][
					Math.floor(Math.random() * 3)
				];
				let c2 = ['acff90', 'ff7373', '6779ff'][
					Math.floor(Math.random() * 3)
				];
				while (c2 === c1) {
					c2 = ['acff90', 'ff7373', '6779ff'][
						Math.floor(Math.random() * 3)
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

		this.setState({ gnome: res.data['results'] });
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
