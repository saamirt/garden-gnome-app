import * as actions from "../actions/actionTypes";

const initialState = {
	error: null,
	loading: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		default:
			return state;
	}
};
