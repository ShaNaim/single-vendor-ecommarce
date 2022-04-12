import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAvtpqi52XwxmPkqw-bKV46O8UW-6H9Pls",
	authDomain: "tennisshopimageserver.firebaseapp.com",
	projectId: "tennisshopimageserver",
	storageBucket: "tennisshopimageserver.appspot.com",
	messagingSenderId: "76439551930",
	appId: "1:76439551930:web:39ba10d05755cafc6aa783",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
// Import the functions you need from the SDKs you need
