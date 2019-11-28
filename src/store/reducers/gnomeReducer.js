import * as actions from "../actions/actionTypes";

const initialState = {
	error: null,
	loading: false,
	deleteGnome: {
		error: null,
		loading: false
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_GNOME_START:
			return { ...state, loading: true };

		case actions.ADD_GNOME_SUCCESS:
			return { ...state, loading: false, error: false };

		case actions.ADD_GNOME_FAIL:
			return { ...state, loading: false, error: payload };

		case actions.DELETE_GNOME_START:
			return {
				...state,
				deleteGnome: { ...state.deleteGnome, loading: true }
			};

		case actions.DELETE_GNOME_SUCCESS:
			return {
				...state,
				deleteGnome: {
					...state.deleteGnome,
					loading: false,
					error: false
				}
			};

		case actions.DELETE_GNOME_FAIL:
			return {
				...state,
				deleteGnome: {
					...state.deleteGnome,
					loading: false,
					error: payload
				}
			};

		default:
			return state;
	}
};
