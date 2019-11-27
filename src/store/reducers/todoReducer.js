import * as actions from "../actions/actionTypes";

const initialState = {
	error: null,
	loading: false,
	deleteTodo: {
		error: null,
		loading: false
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_TODO_START:
			return { ...state, loading: true };

		case actions.ADD_TODO_SUCCESS:
			return { ...state, loading: false, error: false };

		case actions.ADD_TODO_FAIL:
			return { ...state, loading: false, error: payload };

		case actions.DELETE_TODO_START:
			return {
				...state,
				deleteTodo: { ...state.deleteTodo, loading: true }
			};

		case actions.DELETE_TODO_SUCCESS:
			return {
				...state,
				deleteTodo: {
					...state.deleteTodo,
					loading: false,
					error: false
				}
			};

		case actions.DELETE_TODO_FAIL:
			return {
				...state,
				deleteTodo: {
					...state.deleteTodo,
					loading: false,
					error: payload
				}
			};

		default:
			return state;
	}
};

// const initState = {
// 	todos: [
// 		{ id: "1", title: "help me find peach", content: "blah blah blah" },
// 		{ id: "2", title: "collect all the stars", content: "blah blah blah" },
// 		{ id: "3", title: "egg hunt with yoshi", content: "blah blah blah" }
// 	]
// };

// const todoReducer = (state = initState, action) => {
// 	switch (action.type) {
// 		case "CREATE_TODO_SUCCESS":
// 			console.log("created todo", action.todo);
// 			state = { ...state, todos: [...state.todos, action.todo] };
// 			return state;

// 		case "CREATE_TODO_ERR":
// 			console.log("create todo error", action.err);
// 			return state;

// 		case "GET_TODOS":
// 			console.log(action);
// 			return state;

// 		case "GET_ALL_TODOS":
// 			console.log(action);
// 			return state;

// 		default:
// 			return state;
// 	}
// };
// export default todoReducer;
