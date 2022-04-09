import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBb7mWhZEZWCy-lq0J1HUltmpEza7qmbIk',
	authDomain: 'slack-clone-1416a.firebaseapp.com',
	projectId: 'slack-clone-1416a',
	storageBucket: 'slack-clone-1416a.appspot.com',
	messagingSenderId: '992016800556',
	appId: '1:992016800556:web:c3b3dfd0c22125a484ea89'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
