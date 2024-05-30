import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage} from 'firebase/storage'





const firebaseConfig = {
    apiKey: "AIzaSyCsxLlvIbKlY5Wj6rpvWAcc1LovtGb7QLA",
    authDomain: "sistemachamados-4f456.firebaseapp.com",
    projectId: "sistemachamados-4f456",
    storageBucket: "sistemachamados-4f456.appspot.com",
    messagingSenderId: "1083184358670",
    appId: "1:1083184358670:web:a8ac8f6667901601f3e35f",
    measurementId: "G-L2HNPM9ZL6"
  };

  const firbaseapp = initializeApp(firebaseConfig);
  const auth = getAuth(firbaseapp);
  const db = getFirestore(firbaseapp);
  const storage = getStorage(firbaseapp);


  export {auth,db,storage};