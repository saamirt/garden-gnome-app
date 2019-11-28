import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./authReducer";
import gnomeReducer from "./gnomeReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	gnomes: gnomeReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

export default rootReducer;
