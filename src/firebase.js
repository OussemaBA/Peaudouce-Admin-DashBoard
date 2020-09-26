import firebase from "firebase";
const config = {
  apiKey: "AIzaSyDr3KYRwAE1wKHPz07EeFEr6aJv8ZlDur8",
  authDomain: "adminlte-7a511.firebaseapp.com",
  databaseURL: "https://adminlte-7a511.firebaseio.com",
  projectId: "adminlte-7a511",
  storageBucket: "adminlte-7a511.appspot.com",
  messagingSenderId: "257044269234",
  appId: "1:257044269234:web:6187d0cd7b9f7471e721ab",
};

// const config = {
//   apiKey: "AIzaSyBv-m5HtzPLVi5keDIXplW3VS3egyK7ud4",
//   authDomain: "lp-app-bf675.firebaseapp.com",
//   databaseURL: "https://lp-app-bf675.firebaseio.com",
//   projectId: "lp-app-bf675",
//   storageBucket: "lp-app-bf675.appspot.com",
//   messagingSenderId: "1091482759629",
//   appId: "1:1091482759629:web:55d71b42ea437ed6bc5484",
//   measurementId: "G-V4TLRWGCH1"
// };

firebase.initializeApp(config);
export default firebase;
