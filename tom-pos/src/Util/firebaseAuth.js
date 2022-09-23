import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence
} from "firebase/auth";
import { redirect } from "react-router-dom";

const auth = getAuth();

const signUpEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.uid + ' has signed up');
      })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });
};

const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('user signed in');
        redirect("/");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });
};

const signUp = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });
};

const isUserSignedIn = () => {
    return !!getAuth().currentUser;
}

//set Auth state persistence to session only
setPersistence(auth, browserSessionPersistence);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('user: ' + uid + ' has signed in');
    } else {
        // User is signed out
        console.log('user has signed out');
    }
});

export {
    signUpEmail,
    signIn,
    signUp,
    isUserSignedIn
};
