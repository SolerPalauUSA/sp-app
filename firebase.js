import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import  { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';


const firebaseConfig = {
  apiKey: "AIzaSyBTFEaV47yV64CmiwTRDfsnycOCjcd2V1M",
  authDomain: "sp-test-app-6cf54.firebaseapp.com",
  projectId: "sp-test-app-6cf54",
  storageBucket: "sp-test-app-6cf54.appspot.com",
  messagingSenderId: "1014514433218",
  appId: "1:1014514433218:web:9d11272a75db5497d8cf5b",
  measurementId: "G-1LGKN0DSSC",
  databaseURL: "https://sp-test-app-6cf54-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// Reference to a location in the database
const dataRef = ref(db, 'testData');
// Data to be written
const testData = {
  message: 'This is a test, This is a test.. test, test , this is a test'
};
// Write data to the database
set(dataRef, testData)
  .then(() => {
    console.log('Data was successfully written to the database.');
  })
  .catch((error) => {
    console.error('Error writing data to the database:', error);
  });


// Get the Auth object
const auth = getAuth(app);

// Sign in anonymously
signInAnonymously(auth)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('Anonymous user ID:', user.uid);


    localStorage.setItem('appInstalled', 'true');
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
  });