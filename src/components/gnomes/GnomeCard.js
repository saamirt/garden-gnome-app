import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GnomeImage from './GnomeImage';

const Card = styled.div`
	opacity: 0.95;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	&:hover {
		box-shadow: 0 8px 6px rgba(0, 0, 0, 0.15),
			0 0px 16px 0px rgba(0, 0, 0, 0.22);
	}
	-moz-user-select: none;
	-website-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-o-user-select: none;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	cursor: default;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: black;
	}
`;

export default class GnomeCard extends Component {
	state = {
		name: '',
		imageURL: '',
		status: 0,
		gnomeIndex: '',
		imageLoading: true,
		tooManyReq: false
	};

	async componentDidMount() {
		const { name, url } = this.props;
		const gnomeIndex = url.split('/')[url.split('/').length - 2];
		const res = await axios.get(url);
		this.setState({
			name,
			gnomeIndex,
			imageURL: res.data.sprites['front_default']
		});
	}

	toTitleCase = s => {
		return s
			.toLowerCase()
			.split(' ')
			.map(
				letter => letter.charAt(0).toUpperCase() + letter.substring(1)
			)
			.join(' ');
	};

	render() {
		return (
			<div className="col-md-3 col-sm-6 mb-5">
				<StyledLink to={`gnome/${this.state.gnomeIndex}`}>
					<Card
						className="card p-5 align-items-center"
					>
						<h3>
							Gnome {this.toTitleCase(this.state.gnomeIndex)}
						</h3>
						{<GnomeImage gnomeIcon={this.props.gnomeIcon} />}
						<h5>
							{this.state.status ? (
								<span className="badge badge-success">
									Online
								</span>
							) : (
								<span className="badge badge-danger">
									Offline
								</span>
							)}
						</h5>
					</Card>
				</StyledLink>
			</div>
		);
	}
}
