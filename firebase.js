// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCd3kA3x11Re6v5rXvd5oGA9teQDa-hVnc",
    authDomain: "reactnative-ig-clone.firebaseapp.com",
    projectId: "reactnative-ig-clone",
    storageBucket: "reactnative-ig-clone.appspot.com",
    messagingSenderId: "1092765397946",
    appId: "1:1092765397946:web:b0f26e33786d4c0b58a383"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { firebase, auth, db }