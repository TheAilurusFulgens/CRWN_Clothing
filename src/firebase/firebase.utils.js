import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyADYEl2nJtmnWjdVR1AaAxFKx4ZtZeWJHs",
  authDomain: "crwn-db-a3700.firebaseapp.com",
  projectId: "crwn-db-a3700",
  storageBucket: "crwn-db-a3700.appspot.com",
  messagingSenderId: "532985775659",
  appId: "1:532985775659:web:78f0714d858d7fba2a8c6e",
  measurementId: "G-GMM5DB1ZJJ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
