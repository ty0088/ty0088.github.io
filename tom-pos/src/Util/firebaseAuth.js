import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence
} from "firebase/auth";
// import { redirect, useNavigate } from "react-router-dom";

const auth = getAuth();

const signOutAcc = () => {
    signOut(auth).catch((error) => {
        // An error happened.
        console.log(`${error.code}: ${error.message}`);
    });
};

const isUserSignedIn = () => {
    return !!getAuth().currentUser;
}

// const signUpEmail = (email, password) => {
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         console.log(user.uid + ' has signed up');
//       })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage)
//     });
// };

// const signIn = (email, password) => {
//     signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage)
//     });
// };

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         console.log('user: ' + uid + ' has signed in');
//         // const navigate = useNavigate();
//         // navigate('/tom-pos/pos');
//         // redirect("/tom-pos/pos");
//     } else {
//         // User is signed out
//         console.log('user has signed out');
//     }
// });

export {
    signOutAcc,
    isUserSignedIn
};
