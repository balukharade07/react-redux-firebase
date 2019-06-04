import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCKfuRszuucjxwWcXSAKrt0M1ZaL7ZQFxk',
	authDomain: 'reactfirebase-d9248.firebaseapp.com',
	databaseURL: 'https://reactfirebase-d9248.firebaseio.com',
	projectId: 'reactfirebase-d9248',
	storageBucket: 'reactfirebase-d9248.appspot.com',
	messagingSenderId: '831541090456',
};

// react-redux firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

//Init firebase instant
firebase.initializeApp(firebaseConfig);

//init firestore

// const firestore = firebase.firestore();

// const settings = { timestampsInSnapshots:true}
// firestore.settings(settings)

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase),
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

//Create initial state
const initialState = {};

// Create Store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		// Suport All Browser
		window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,

		// ****Suport only Google Chrome Browser****

		// window.__REDUX_DEVTOOLS_EXTENSION__ &&
		// 	window.__REDUX_DEVTOOLS_EXTENSION__(),
	),
);

export default store;
