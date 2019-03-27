import React, { Component } from 'react';
import axios from 'axios';

const TYPE_COLORS = {
	bug: 'B1C12E',
	dark: '4F3A2D',
	dragon: '755EDF',
	electric: 'FCBC17',
	fairy: 'F4B1F4',
	fighting: '823551D',
	fire: 'E73B0C',
	flying: 'A3B3F7',
	ghost: '6060B2',
	grass: '74C236',
	ground: 'D3B357',
	ice: 'A3E7FD',
	normal: 'C8C4BC',
	poison: '934594',
	psychic: 'ED4882',
	rock: 'B9A156',
	steel: 'B5B5C3',
	water: '3295F6'
};

export default class Gnome extends Component {
	state = {
		name: '',
		pokemonIndex: '',
		imageUrl: '',
		types: [],
		desc: '',
		statTitleWidth: 3,
		statBarWidth: 9,
		stats: {
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			specialAttack: '',
			specialDefense: ''
		},
		height: '',
		weight: '',
		eggGroups: '',
		catchRate: '',
		abilities: '',
		genderRatioMale: '',
		genderRatioFemale: '',
		evs: '',
		hatchSteps: '',
		themeColor: '#EF5350'
	};

	toTitleCase = s => {
		return s
			.toLowerCase()
			.split('-')
			.map(
				letter => letter.charAt(0).toUpperCase() + letter.substring(1)
			)
			.join(' ');
	};

	async componentDidMount() {
		const { gnomeindex } = this.props.match.params;

		//urls for info
		const url1 = `https://pokeapi.co/api/v2/pokemon/${gnomeindex}/`;
		const url2 = `https://pokeapi.co/api/v2/pokemon-species/${gnomeindex}/`;

		//get info
		const res = await axios.get(url1);
		const name = res.data.name;
		const imageUrl = res.data.sprites.front_default;

		let { hp, att, def, spd, satt, sdef } = '';

		res.data.stats.map(stat => {
			switch (stat.stat.name) {
				case 'hp':
					hp = stat['base_stat'];
					break;
				case 'attack':
					att = stat['base_stat'];
					break;
				case 'defense':
					def = stat['base_stat'];
					break;
				case 'speed':
					spd = stat['base_stat'];
					break;
				case 'special-attack':
					satt = stat['base_stat'];
					break;
				case 'special-defense':
					sdef = stat['base_stat'];
					break;

				default:
					break;
			}
		});

		const height =
			Math.round((res.data.height * 0.328084 + 0.0001) * 100) / 100;

		const weight =
			Math.round((res.data.height * 0.220462 + 0.0001) * 100) / 100;

		const types = res.data.types.map(type => type.type.name);

		const abilities = res.data.abilities
			.map(ability => this.toTitleCase(ability.ability.name))
			.join(', ');

		const evs = res.data.stats
			.filter(stat => {
				return stat.effort > 0;
			})
			.map(stat => {
				return `${stat.effort} ${this.toTitleCase(stat.stat.name)}`;
			})
			.join(', ');

		//get description
		await axios.get(url2).then(res => {
			let desc = '';
			res.data.flavor_text_entries.some(flavor => {
				if (flavor.language.name === 'en') {
					desc = flavor.flavor_text;
					return 0;
				}
			});

			const femaleRate = res.data['gender_rate'];
			const genderRatioF = 12.5 * femaleRate;
			const genderRatioM = 100 - genderRatioF;

			const catchRate = Math.round(
				(100 / 255) * res.data['capture_rate']
			);

			const eggGroups = res.data['egg_groups']
				.map(group => this.toTitleCase(group.name))
				.join(', ');

			const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

			this.setState({
				name,
				desc,
				genderRatioF,
				genderRatioM,
				catchRate,
				eggGroups,
				hatchSteps
			});

			this.setState({
				imageUrl,
				index: gnomeindex,
				name,
				types,
				stats: {
					hp,
					att,
					def,
					spd,
					satt,
					sdef
				},
				height,
				weight,
				abilities,
				evs
			});
		});
	}

	render() {
		return (
			<div className="col">
				<div className="card">
					<div className="card-header">
						<div className="row">
							<div className="col-5">
								<h5>{this.state.index}</h5>
							</div>
							<div className="col-7">
								<div className="float-right">
									{this.state.types.map(type => (
										<span
											key={type}
											className="badge badge-pill badge-primary mr-1 h-100"
											style={{
												backgroundColor: `#${
													TYPE_COLORS[type]
												}`,
												color: 'white'
											}}
										>
											{this.toTitleCase(type)}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col-md-3">
								<img
									src={this.state.imageUrl}
									alt={this.state.name}
									className="card-img-top rounded mx-auto mt-2"
								/>
							</div>
							<div className="col-md-9">
								<h4 className="mx-auto">
									{this.toTitleCase(this.state.name)}
								</h4>
								<div className="row align-items-center">
									<div className="col-md-3">HP</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${
														this.state.stats.hp
													}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.hp}
												</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-md-3">Attack</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${
														this.state.stats.att
													}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.att}
												</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-md-3">Defense</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${
														this.state.stats.def
													}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.def}
												</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-md-3">Speed</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${
														this.state.stats.spd
													}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.spd}
												</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-md-3">
										Special Attack
									</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${
														this.state.stats.satt
													}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.satt}
												</small>
											</div>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-md-3">
										Special Defense
									</div>
									<div className="col-12 col-md-9">
										<div className="progress">
											<div
												className="progress-bar"
												role="progressBar"
												style={{
													width: `${
														this.state.stats.sdef
													}%`
												}}
												aria-valuenow="25"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.stats.sdef}
												</small>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row mt-1 w-100">
								<div className="col">
									<p
										className="p-2 mx-auto"
										style={{ width: 'fit-content' }}
									>
										{this.state.desc}
									</p>
								</div>
							</div>
						</div>
					</div>
					<hr />
					<div className="card-body">
						<h5 class="card-title text-center">Profile</h5>
						<div className="row">
							<div className="col-md-6">
								<div className="row">
									<div className="col-6">
										<h6 className="float-right">
											Height:
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">
											{this.state.height} ft.
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">
											Weight:
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">
											{this.state.weight} lbs
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">
											Catch Rate:
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">
											{this.state.catchRate}%
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">
											Gender Ratio:
										</h6>
									</div>
									<div className="col-6">
										<div class="progress">
											<div
												class="progress-bar"
												role="progressbar"
												style={{
													width: `${
														this.state.genderRatioF
													}%`,
													backgroundColor: '#c2185b'
												}}
												aria-valuenow="15"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.genderRatioF}
												</small>
											</div>
											<div
												class="progress-bar"
												role="progressbar"
												style={{
													width: `${
														this.state.genderRatioM
													}%`,
													backgroundColor: '#1976d2'
												}}
												aria-valuenow="30"
												aria-valuemin="0"
												aria-valuemax="100"
											>
												<small>
													{this.state.genderRatioM}
												</small>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="row">
									<div className="col-6">
										<h6 className="float-right">
											Egg Groups:
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">
											{this.state.eggGroups}{' '}
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">
											Hatch Steps:
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">
											{this.state.hatchSteps} Step
											{this.state.hatchSteps > 1
												? 's'
												: ''}
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">
											Abilities:
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">
											{this.state.abilities}
										</h6>
									</div>
									<div className="col-6">
										<h6 className="float-right">EVs:</h6>
									</div>
									<div className="col-6">
										<h6 className="float-left">
											{this.state.evs}
										</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-footer text-muted">
						Data From{' '}
						<a
							href="https://pokeapi.co/"
							target="_blank"
							rel="noopener noreferrer"
							className="card-link"
						>
							PokeAPI.co
						</a>
					</div>
				</div>
			</div>
		);
	}
}
