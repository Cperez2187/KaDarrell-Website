import firebase from 'firebase';

//TODO: Change this config to Anthony's firebase
const config = {
  apiKey: "AIzaSyCbTCw8Hk2NcQcckB6dm1rYStQk3m2LpSk",
  authDomain: "kadarrell-blog.firebaseapp.com",
  databaseURL: "https://kadarrell-blog.firebaseio.com",
  projectId: "kadarrell-blog",
  storageBucket: "kadarrell-blog.appspot.com",
  messagingSenderId: "211841196438"
};

const fire = firebase.initializeApp(config);
export default fire;