import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAxGXwXzDwR5Uw2m1IqkTahRsurhNYXy8Y",
    authDomain: "socrat-iq.firebaseapp.com",
    projectId: "socrat-iq",
    storageBucket: "socrat-iq.appspot.com",
    messagingSenderId: "964947878033",
    appId: "1:964947878033:web:e7cf1d1678964268215f30",
    measurementId: "G-LRMTR1SYGW"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth };