import "./index.css";

import React from "react";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";

//firestore
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import {
	createFirestoreInstance,
	reduxFirestore,
	getFirestore
} from "redux-firestore";
import firebase from "./config/firebase_config";

//thunk
import thunk from "redux-thunk";

const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
		: compose;

const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true,
	attachAuthIsReady: true
};

// thunk is middleware allows writing action creators that return a function
// instead of an action. Useful for doing things between the action and reducer
// like accessing a database.
// .withExtraArgument function adds params (firebase stuff) as extra args for action
//
// reduxFirestore and reactReduxFirebase connect our firebase app (configured in
//  firebaseConfig) to our store.
const store = createStore(
	rootReducer,
	composeEnhancers(
		// reactReduxFirebase(firebase, rrfConfig), // redux binding for firebase
		reduxFirestore(firebase), // redux bindings for firestore
		applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase }))
	)
);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance // <- needed if using firestore
};

// Setup react-redux so that connect HOC can be used
render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
