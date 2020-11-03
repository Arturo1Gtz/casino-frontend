import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDtK4czTLYBdQEtRAxI4Z7RMeFex9mLw6M",
    authDomain: "casino-a03d6.firebaseapp.com",
    databaseURL: "https://casino-a03d6.firebaseio.com",
    projectId: "casino-a03d6",
    storageBucket: "casino-a03d6.appspot.com",
    messagingSenderId: "551930734630",
    appId: "1:551930734630:web:4356d54a2487df8da3dee7",
    measurementId: "G-2R2F2GGNKZ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const storage = firebase.storage();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`user/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      try {
        await userRef.set({
          displayName,
          email,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  export const createUserProfileDocument2 = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`user/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { email, password } = userAuth;
      try {
        await userRef.set({
          email,
          password,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


  

export {
  storage, firebase as default
};