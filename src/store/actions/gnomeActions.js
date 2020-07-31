import * as actions from "./actionTypes";

// Add a gnome
export const addGnome = (data) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	dispatch({ type: actions.ADD_GNOME_START });
	try {
		const userId = getState().firebase.auth.uid;
		const gnome = {
			data: [
				{
					light: 52 + Math.floor(Math.random() * 36),
					soil_humidity: 24 + Math.floor(Math.random() * 36),
					temperature: 15 + Math.floor(Math.random() * 36),
					timestamp: 1595731018 + Math.floor(Math.random() * 3600),
					location: new firestore.GeoPoint(43, 79),
					state: {
						hose: {
							is_active: false,
						},
					},
				},
			],
			schedule: [
				{
					start_time: 1596732018,
					state: {
						hose: {
							is_active: true,
							duration: 60,
						},
					},
				},
				{
					recurring: 604800,
					start_time: 1596632018,
					state: {
						hose: {
							is_active: true,
							duration: 120,
						},
					},
				},
			],
			state: {
				hose: {
					is_active: false,
					duration: -1,
					end_timestamp: null,
				},
			},
		};
		const gnomeId = (await firestore.collection("gnomes").add(gnome)).id;

		const gnomeMeta = {
			name: data.name,
			location: new firestore.GeoPoint(data.latitude, data.longitude),
			is_connected: false,
		};

		const res = await firestore.collection("users").doc(userId).get();
		firestore
			.collection("users")
			.doc(userId)
			.update({
				gnomes: Object.assign(res.data().gnomes, {
					[gnomeId]: gnomeMeta,
				}),
			});
		dispatch({ type: actions.ADD_GNOME_SUCCESS });
		return true;
	} catch (err) {
		dispatch({ type: actions.ADD_GNOME_FAIL, payload: err.message });
	}
};

// Delete gnome
export const deleteGnome = (id) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.DELETE_GNOME_START });
	try {
		const res = await firestore.collection("gnomes").doc(userId).get();
		const previousGnomes = res.data().gnomes;
		const newGnomes = previousGnomes.filter((gnome) => gnome.id !== id);
		await firestore.collection("gnomes").doc(userId).update({
			gnomes: newGnomes,
		});
		dispatch({ type: actions.DELETE_GNOME_SUCCESS });
	} catch (err) {
		dispatch({ type: actions.DELETE_GNOME_FAIL, payload: err.message });
	}
};

// edit gnome
export const editGnome = (id, data) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.ADD_GNOME_START });
	try {
		const res = await firestore.collection("gnomes").doc(userId).get();
		const gnomes = res.data().gnomes;
		const index = gnomes.findIndex((gnome) => gnome.id === id);
		gnomes[index].title = data.title;
		gnomes[index].content = data.content;

		await firestore.collection("gnomes").doc(userId).update({
			gnomes,
		});
		dispatch({ type: actions.ADD_GNOME_SUCCESS });
		return true;
	} catch (err) {
		dispatch({ type: actions.ADD_GNOME_FAIL, payload: err.message });
	}
};

// set gnome state
export const setGnomeState = (id, change_set) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	console.log("start state change", change_set, id);
	const firestore = getFirestore();
	dispatch({ type: actions.SET_GNOME_STATE_START });

	try {
		firestore
			.collection("gnomes")
			.doc(id)
			.update({
				state: { ...change_set },
			})
			.then(() => {
				console.log("Update state succesfull");
				dispatch({ type: actions.SET_GNOME_STATE_SUCCESS });
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
		return true;
	} catch (err) {
		dispatch({ type: actions.SET_GNOME_STATE_FAIL, payload: err.message });
	}
};

// set gnome state
export const setGnomeMetaState = (id, change_set) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	console.log("start state change", change_set, id);
	const firestore = getFirestore();
	dispatch({ type: actions.SET_GNOME_STATE_START });

	try {
		const userId = getState().firebase.auth.uid;

		firestore
			.collection("users")
			.doc(userId)
			.update({
				[`gnomes.${id}`]: { ...change_set },
			})
			.then(() => {
				console.log("Update state succesfull");
				dispatch({ type: actions.SET_GNOME_STATE_SUCCESS });
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
		return true;
	} catch (err) {
		dispatch({ type: actions.SET_GNOME_STATE_FAIL, payload: err.message });
	}
};