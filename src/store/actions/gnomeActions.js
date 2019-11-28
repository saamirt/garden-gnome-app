import * as actions from "./actionTypes";

// Add a gnome
export const addGnome = data => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.ADD_GNOME_START });
	try {
		const res = await firestore
			.collection("gnomes")
			.doc(userId)
			.get();
		const newGnome = {
			id: new Date().valueOf(),
			name: data.name,
			location: new firestore.GeoPoint(data.latitude, data.longitude),
			data: {
				created_at: new Date().valueOf(),
				light: 120,
				soil_humidity: 34,
				temperature: 14
			}
		};
		if (!res.data()) {
			console.log("got here");
			firestore
				.collection("gnomes")
				.doc(userId)
				.set({
					gnomes: [newGnome]
				});
		} else {
			firestore
				.collection("gnomes")
				.doc(userId)
				.update({
					gnomes: [...res.data().gnomes, newGnome]
				});
		}
		dispatch({ type: actions.ADD_GNOME_SUCCESS });
		return true;
	} catch (err) {
		dispatch({ type: actions.ADD_GNOME_FAIL, payload: err.message });
	}
};

// Delete gnome
export const deleteGnome = id => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.DELETE_GNOME_START });
	try {
		const res = await firestore
			.collection("gnomes")
			.doc(userId)
			.get();
		const previousGnomes = res.data().gnomes;
		const newGnomes = previousGnomes.filter(gnome => gnome.id !== id);
		await firestore
			.collection("gnomes")
			.doc(userId)
			.update({
				gnomes: newGnomes
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
		const res = await firestore
			.collection("gnomes")
			.doc(userId)
			.get();
		const gnomes = res.data().gnomes;
		const index = gnomes.findIndex(gnome => gnome.id === id);
		gnomes[index].title = data.title;
		gnomes[index].content = data.content;

		await firestore
			.collection("gnomes")
			.doc(userId)
			.update({
				gnomes
			});
		dispatch({ type: actions.ADD_GNOME_SUCCESS });
		return true;
	} catch (err) {
		dispatch({ type: actions.ADD_GNOME_FAIL, payload: err.message });
	}
};
