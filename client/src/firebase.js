import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDsFZf6udxk3VAW6JGeSBBdVCqCf7WrR3Y',

    authDomain: 'eventify-6089d.firebaseapp.com',

    projectId: 'eventify-6089d',

    storageBucket: 'eventify-6089d.appspot.com',

    messagingSenderId: '428260232775',

    appId: '1:428260232775:web:5a79a0de57157d450aab62',

    measurementId: 'G-R2GKKF07RR',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };