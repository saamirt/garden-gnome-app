import React, { Component } from 'react';

export default class GnomeImage extends Component {
	async componentDidMount() {
		console.log(this.props);
	}
	render() {
		return (
			<div className="mx-auto my-3">
				<svg
					id="Gnome"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 15.83 25.41"
					height="150px"
				>
					<title>Gnome Single</title>
					<path
						id="EarL"
						className="cls-2"
						style={{ fill: `#${this.props.gnomeIcon.skinColor}` }}
						d="M135.79,141.56a13.13,13.13,0,0,1,1-2.37.59.59,0,0,1-.19-.37c-.46-.31-1-.44-1.17.4C135.18,140.37,135.36,141.22,135.79,141.56Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="EarR"
						className="cls-2"
						style={{ fill: `#${this.props.gnomeIcon.skinColor}` }}
						d="M146.4,139.2a13.13,13.13,0,0,1,1,2.37c.43-.33.62-1.19.36-2.34-.19-.84-.71-.72-1.17-.4A.59.59,0,0,1,146.4,139.2Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="Nose"
						className="cls-2"
						style={{ fill: `#${this.props.gnomeIcon.skinColor}` }}
						d="M141.54,143.07h.11a4.34,4.34,0,0,1,.85-.15.7.7,0,0,0,.13-.57,1,1,0,0,0-.34-.57,1.07,1.07,0,0,0-1.38,0,1,1,0,0,0-.34.54.71.71,0,0,0,.12.6A4.34,4.34,0,0,1,141.54,143.07Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="Face"
						className="cls-2"
						style={{ fill: `#${this.props.gnomeIcon.skinColor}` }}
						d="M145.59,139.39c-1.24.12-2.59.19-4,.19a40.22,40.22,0,0,1-4.07-.21,5.44,5.44,0,0,0-.55,4.27.19.19,0,0,1,.19,0,1.87,1.87,0,0,0,1.87-.26,2.3,2.3,0,0,1,1.67-.43.71.71,0,0,1-.12-.6,1,1,0,0,1,.34-.54,1.07,1.07,0,0,1,1.38,0,1,1,0,0,1,.34.57.7.7,0,0,1-.13.57,2.3,2.3,0,0,1,1.67.44,1.87,1.87,0,0,0,1.87.27.19.19,0,0,1,.11,0A5.47,5.47,0,0,0,145.59,139.39Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="Moustache"
						className="cls-3"
						style={{ fill: `#${this.props.gnomeIcon.beardColor}` }}
						d="M146.29,143.85a.2.2,0,0,0-.25-.23,1.87,1.87,0,0,1-1.87-.27,2.92,2.92,0,0,0-2.51-.28h-.11a2.92,2.92,0,0,0-2.51.28,1.87,1.87,0,0,1-1.87.26.2.2,0,0,0-.25.23c.19.76,1,2.36,4.64,1.55h.09C145.27,146.21,146.1,144.61,146.29,143.85Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="Beard"
						className="cls-3"
						style={{ fill: `#${this.props.gnomeIcon.beardColor}` }}
						d="M146.4,139.2a.57.57,0,0,1-.31.14l-.5,0a5.47,5.47,0,0,1,.55,4.23.2.2,0,0,1,.14.24c-.18.71-.92,2.17-4,1.66a.7.7,0,0,1-1.33,0c-3.11.5-3.85-1-4-1.67a.19.19,0,0,1,.07-.2,5.44,5.44,0,0,1,.55-4.27l-.42,0a.57.57,0,0,1-.31-.14c-1.26,2.31-3.9,8.74,4.31,10.88a1.91,1.91,0,0,0,1,0C150.29,147.95,147.66,141.51,146.4,139.2Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="Hat"
						className="cls-4"
						style={{ fill: `#${this.props.gnomeIcon.secColor}` }}
						d="M136.63,138.54a.59.59,0,0,0,.48.79,41.29,41.29,0,0,0,9,0,.59.59,0,0,0,.48-.79L142,126.14a.39.39,0,0,0-.73,0Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="Mouth"
						className="cls-1"
						style={{ fill: `#${this.props.gnomeIcon.primColor}` }}
						d="M141.64,145.39h-.09l-.62.12a.7.7,0,0,0,1.33,0Z"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="EyeL"
						className="cls-1"
						d="M138.63,141.47a.64.64,0,0,1,1.29,0"
						transform="translate(-133.68 -125.52)"
					/>
					<path
						id="EyeR"
						className="cls-1"
						d="M143.28,141.48a.64.64,0,0,1,1.29,0"
						transform="translate(-133.68 -125.52)"
					/>
				</svg>
			</div>
		);
	}
}
