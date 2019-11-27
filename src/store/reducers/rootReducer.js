import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./authReducer";
import todoReducer from "./todoReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	todos: todoReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

export default rootReducer;
