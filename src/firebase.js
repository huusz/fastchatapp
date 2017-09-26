import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAR1NV7Mp4iTBArp2xszsUFOCgg0P3HPcs",
  authDomain: "fastchat01234.firebaseapp.com",
  databaseURL: "https://fastchat01234.firebaseio.com",
  projectId: "fastchat01234",
  storageBucket: "fastchat01234.appspot.com",
  messagingSenderId: "740054554850"
}

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
