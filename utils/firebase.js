import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
<<<<<<< HEAD

=======
// import * as firebaseAdmin from "firebase-admin";
// import serviceAccount from "../secrets.json";
// // import { ServiceAccount } from "firebase-admin";

// export const verifyIdToken = (token) => {
// 	if (!firebaseAdmin.apps.length) {
// 		firebaseAdmin.initializeApp({
// 			credential: firebaseAdmin.credential.cert({
// 				privateKey: serviceAccount.private_key,
// 				clientEmail: serviceAccount.client_email,
// 				projectId: serviceAccount.project_id,
// 			}),
// 			databaseURL: "https://njas-ca677.firebaseio.com",
// 		});
// 	}
// };

const firebaseConfig = {
	apiKey: "AIzaSyBTuu1Q4OTd-4GYY3nKRL9-ODgjxSxZF00",
	authDomain: "njas-ca677.firebaseapp.com",
	databaseURL: "https://njas-ca677.firebaseio.com",
	projectId: "njas-ca677",
	storageBucket: "njas-ca677.appspot.com",
	messagingSenderId: "5145396905",
	appId: "1:5145396905:web:e0f96624cf4e2b3b55cbb8",
	measurementId: "G-69S8CLDZ5F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
