import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import Loader from "../../components/Loader";

import * as actions from "../../store/actions/gnomeActions";

import "./style.scss";

//makes setting and disappearing the success message thread-safe.
//prevents setting success to false while other calls are still going on
let semaphore = 0;

const AddGnomePage = ({ addGnome, loading, error }) => {
	const [form, setForm] = useState({ name: "", latitude: "", longitude: "" });
	const [success, setSuccess] = useState(false);
	

	const handleInputChange = e => {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const id = target.id;

		setForm({ ...form, [id]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (
			!(form.name.trim() && form.latitude.trim() && form.longitude.trim())
		){
			return;
		}
		await addGnome({
			...form,
			latitude: Number(form.latitude),
			longitude: Number(form.longitude)
		}).then(() => {
			if (!error) {
				semaphore += 1;
				setSuccess(true);
				setTimeout(() => {
					semaphore -= 1;
					if (semaphore < 1) {
						setSuccess(false);
					}
				}, 3000);
			}
		});
		setForm({ name: "", latitude: "", longitude: "" });
	};
	return (
		<div className="container mt-5">
			<Helmet>
				<title>Add Gnome</title>
				<meta
					name="description"
					content="A React.js Boilerplate application"
				/>
			</Helmet>
			{error ? (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			) : success ? (
				<div className="alert alert-primary" role="alert">
					New gnome submitted!
				</div>
			) : null}
			<div className="card p-5">
				<h1 id="add-Gnome-Page" className="text-center">Add Gnome</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Gnome Title</label>
						<input
							type="name"
							className="form-control"
							id="name"
							placeholder="Enter name"
							onChange={handleInputChange}
							value={form.name}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="latitude">latitude</label>
						<input
							type="number"
							className="form-control"
							id="latitude"
							placeholder="Enter Latitude"
							onChange={handleInputChange}
							value={form.latitude}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="longitude">longitude</label>
						<input
							type="number"
							className="form-control"
							id="longitude"
							placeholder="Enter Longitude"
							onChange={handleInputChange}
							value={form.longitude}
							required
						/>
					</div>
					
					<button
						disabled={loading}
						type="submit"
						className="btn btn-primary"
					>
						{loading ? "Loading..." : "Submit"}
					</button>
				</form>
				{/* {(error || success) && (
					<small id="formError" className="form-text text-muted mt-3">
						{error || "Successfully added a new item!"}
					</small>
				)} */}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	console.log(state);
	const { gnomes } = state;
	return {
		loading: gnomes.addGnome.loading,
		error: gnomes.addGnome.error
	};
};

const mapDispatchToProps = {
	addGnome: actions.addGnome,
	editGnomeAction: actions.editGnome
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGnomePage);
