import React, { Component } from 'react';
import Graph from './SensorPlot';
import GnomeImage from './GnomeImage';
import { ParentSize } from '@vx/responsive';

export default class Gnome extends Component {
	state = {
		name: '',
		data: { temp: 23.4, humidity: 40, light: 425 },
		graphWid: 400
	};

	async componentDidMount() {
		this.setState({ name: this.props.name });
	}

	toTitleCase = s => {
		return s
			.toLowerCase()
			.split('-')
			.map(
				letter => letter.charAt(0).toUpperCase() + letter.substring(1)
			)
			.join(' ');
	};

	render() {
		return (
			<div>
				<div className="card mb-4">
					<div className="card-header" />
					<div className="card-body">
						<h1 className="mb-4">Controls</h1>
						<div className="row">
							<div className="col-sm-4">
								<div className="card mb-3">
									<div className="card-body text-center">
										<h5>
											{this.toTitleCase('Temperature')}
										</h5>
										<GnomeImage />
									</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="card mb-3">
									<div className="card-body text-center">
										<h5>
											{this.toTitleCase('Temperature')}
										</h5>
										<GnomeImage />
									</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="card mb-3">
									<div className="card-body text-center">
										<h5>
											{this.toTitleCase('Temperature')}
										</h5>
										<GnomeImage />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="card-footer text-muted">
						Data from IoT Gnome Device
					</div>
				</div>
				<div className="row">
					<div className="col-xl-6 col-lg-12 graph1">
						<div className="card mb-4">
							<div className="card-body">
								<h5>{this.toTitleCase('Temperature')}</h5>
								<div className="my-3">
									<ParentSize>
										{parent => (
											<Graph
												width={parent.width}
												hue={0}
											/>
										)}
									</ParentSize>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-12 graph2">
						<div className="card mb-4">
							<div className="card-body">
								<h5>{this.toTitleCase('Temperature')}</h5>
								<div className="my-3">
									<ParentSize>
										{parent => (
											<Graph
												width={parent.width}
												hue={50}
											/>
										)}
									</ParentSize>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-12 graph3">
						<div className="card mb-4">
							<div className="card-body">
								<h5>{this.toTitleCase('Temperature')}</h5>
								<div className="my-3">
									<ParentSize>
										{parent => (
											<Graph
												width={parent.width}
												hue={100}
											/>
										)}
									</ParentSize>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
