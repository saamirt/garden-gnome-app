import * as actions from "../actions/actionTypes";

const initialState = {
	addGnome: {
		error: null,
		loading: false,
	},
	deleteGnome: {
		error: null,
		loading: false
	},
	editGnomeHose: {
		error: null,
		loading: false
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_GNOME_START:
			return { 
				...state,
				addGnome: {
					...state.addGnome,
					loading: true,
					error: false 
				}
			} 
				
		case actions.ADD_GNOME_SUCCESS:
			return { 
				...state,
				addGnome: {
					...state.addGnome,
					loading: false, 
					error: false
				}
			} 

		case actions.ADD_GNOME_FAIL:
			return { 
				...state,
				addGnome:{
					...state.addGnome,
					loading: false, 
					error: payload 
				}
			} 

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
		
		case actions.EDIT_GNOME_HOSE_START:
			return {
				...state,
				editGnomeHose:{
					...state.editGnomeHose,
					loading: true,
					error: false
				}
			};

		case actions.EDIT_GNOME_HOSE_SUCCESS:
			return {
				...state,
				editGnomeHose:{
					...state.editGnomeHose,
					loading: false,
					error: false
				}
			};
			
		case actions.EDIT_GNOME_HOSE_FAIL:
			return {
				...state,
				editGnomeHose:{
					...state.editGnomeHose,
					loading: false,
					error: payload
				}
			};

		default:
			return state;
	}
};
