import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8MQxoQhCoeSt3C76ohco5wEdlYjtWov0",
    authDomain: "mini-linkedin-61973.firebaseapp.com",
    databaseURL: "https://mini-linkedin-61973.firebaseio.com",
    projectId: "mini-linkedin-61973",
    storageBucket: "mini-linkedin-61973.appspot.com",
    messagingSenderId: "747287799789",
    appId: "1:747287799789:web:d42ede91e120129ad969e4"
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots:true});

  const storage=firebase.storage();

  export {storage, firebase as default};