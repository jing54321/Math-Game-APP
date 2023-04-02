/**
 StAuth10244: I Kyungwon Lee, 000865096 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';
import serviceAccount from './serviceAccount.js';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://math-game-69445-default-rtdb.firebaseio.com"
  });

const fdb = getFirestore()

export default fdb