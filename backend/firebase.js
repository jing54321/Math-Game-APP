
import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';
import serviceAccount from './serviceAccount.js';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://math-game-69445-default-rtdb.firebaseio.com"
  });

const fdb = getFirestore()

export default fdb
