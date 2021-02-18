import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAp5Ib8GADC7oVHiIWkqTiQW1ObcJorq5M",
	authDomain: "instagram-clone-74f50.firebaseapp.com",
	databaseURL: "https://instagram-clone-74f50-default-rtdb.firebaseio.com",
	projectId: "instagram-clone-74f50",
	storageBucket: "instagram-clone-74f50.appspot.com",
	messagingSenderId: "929289433074",
	appId: "1:929289433074:web:58e73055ee48488c3b056b",
	measurementId: "G-N6QQVNP6YQ",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
