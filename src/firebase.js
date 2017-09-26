import firebase from 'firebase';

const config = {}

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();