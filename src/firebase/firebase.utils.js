import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCG9wH2fu7o-rFa1DYmmJVaHXWsB37BBgc",
    authDomain: "crwn-db-b1115.firebaseapp.com",
    databaseURL: "https://crwn-db-b1115.firebaseio.com",
    projectId: "crwn-db-b1115",
    storageBucket: "crwn-db-b1115.appspot.com",
    messagingSenderId: "1058097614216",
    appId: "1:1058097614216:web:b0e349dacfcd98a2f73e3d",
    measurementId: "G-DLZ1JR9VRH"
  };
  // database firebase
  export const createUserProfileDocument =  async (userAuth, additionalData) => {
    if(!userAuth) return ;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    console.log("amdm", snapShot)
    if(!snapShot.exists) {
      //create a data if data for new user doesnt exist
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error) {
        console.log("error creating user", error.message)
      }
    }
    return userRef; //can be used later on
  }

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;