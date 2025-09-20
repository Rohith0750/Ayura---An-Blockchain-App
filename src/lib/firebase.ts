
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-3683247771-b46aa",
  "appId": "1:272150130253:web:8c6e4a27f4901b43623604",
  "apiKey": "AIzaSyCOJ7fTO9_o33P8I5sE093Otv-fBfURr0g",
  "authDomain": "studio-3683247771-b46aa.firebaseapp.com",
  "messagingSenderId": "272150130253"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);

export { app, auth };
