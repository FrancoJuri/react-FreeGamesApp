import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDBNJgqP1uYAk-Upx6XKRLz1mfyrzEqUI8",
    authDomain: "free-games-28877.firebaseapp.com",
    projectId: "free-games-28877",
    storageBucket: "free-games-28877.appspot.com",
    messagingSenderId: "987690754137",
    appId: "1:987690754137:web:cb2885750acbd8394d1148"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const usersRef = db.collection('users');
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    usersRef,
    googleAuthProvider,
    firebase,
}
