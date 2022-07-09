// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1cdcxgZLYj_ZA1c7OeihPo1oQ2rIV16Y',
  authDomain: 'digital-attendance-2afa8.firebaseapp.com',
  projectId: 'digital-attendance-2afa8',
  storageBucket: 'digital-attendance-2afa8.appspot.com',
  messagingSenderId: '933289084839',
  appId: '1:933289084839:web:55c8def7e662ca2b3bd882',
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  // the script below saved the day but I dont know why it worked
  // for more info -> https://stackoverflow.com/questions/65594133/react-native-to-firestore-firestore-8-2-1-connection-webchannel-transport-er
  firebase.firestore().settings({ experimentalForceLongPolling: true, merge:true });
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export {db, auth};
