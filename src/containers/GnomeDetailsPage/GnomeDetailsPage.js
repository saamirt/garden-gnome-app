import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import * as actions from "../../store/actions/gnomeActions";
import LineChart from "../../components/LineChart";

import "./style.scss";

const GnomeDetailsPage = ({ gnome, setGnomeState, loading, error }) => {
	const { id } = useParams();
	let [state, setState] = useState({});
	let [data, setData] = useState({
		light: [],
		soil_humidity: [],
		temperature: [],
	});

	useEffect(() => {
		if (gnome) {
			setState(gnome.state);
			if (gnome.data) {
				let timestamps = gnome.data.map((a) =>
					new Date(a.timestamp * 1000).toLocaleString()
				);
				console.log(gnome);
				setData({
					sensors: ["light", "temperature", "soil_humidity"].reduce(
						(prev, key) =>
							Object.assign(prev, {
								[key]: gnome.data.map((a) => a[key] || null),
							}),
						{}
					),
					timestamps,
				});
				console.log(data);
			}
		}
	}, [gnome]);

	const toCapitalCase = (str) =>
		str.replace(
			/\w\S*/g,
			(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		);

	const toggleHose = async () => {
		if (!state.hose) {
			return;
		}
		let state_change = {
			hose: {
				is_active: !state.hose.is_active,
				duration: -1,
				end_timestamp: null,
			},
		};
		await setGnomeState(id, state_change).then(() => {
			if (error) {
				console.error("Error Editing Gnome Hose", error);
			}
		});
	};

	return (
		<div className="container mt-5">
			<Helmet>
				<title>Gnome Dashboard</title>
			</Helmet>
			<h1 className="page__title text-center">Gnome Dashboard</h1>
			{gnome && (
				<div className="w-100 text-center mt-3">
					<button
						type="button"
						className={`col-4 btn btn-primary gnome_hose_button btn-${
							state.hose && state.hose.is_active
								? "success"
								: "danger"
						}`}
						onClick={toggleHose}
						disabled={loading}
					>
						{loading
							? "loading..."
							: state.hose && state.hose.is_active
							? "Hose is On"
							: "Hose is Off"}
					</button>
					{data.sensors &&
						Object.keys(data.sensors).map((k) => (
							<div className="row" key={k}>
								<LineChart
									data={!loading && data.sensors[k]}
									label={toCapitalCase(k.replace("_", " "))}
									labels={data.timestamps}
									borderColor={"#00b4bd"}
								/>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = ({ firebase, firestore, gnomes }, props) => {
	let user =
		firestore.data.users &&
		firestore.data.gnomes &&
		Object.values(firestore.data.users)[0];
	let gnomeState = gnomes.setGnomeState;
	let { id } = props.match.params;
	return {
		userId: firebase.auth.uid,
		gnome: user && {
			...firestore.data.gnomes[id],
			properties: user.gnomes[id],
		},
		loading: gnomeState.loading,
		error: gnomeState.error,
	};
};
const mapDispatchToProps = {
	setGnomeState: actions.setGnomeState,
};
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => ["gnomes", `users/${props.userId}`])
)(GnomeDetailsPage);
