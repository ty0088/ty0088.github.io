// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { list } from "./listLogic";
import { filterLists } from "./filterLogic";
import { listener } from "./listenerLogic";
import { contentUpdater } from "./contentLogic";

const firebase = (() => {
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAkvaAudx4OQmqY1uuKUy_NOPYKhtEKWI",
    authDomain: "top-to-do-d45c1.firebaseapp.com",
    databaseURL: "https://top-to-do-d45c1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "top-to-do-d45c1",
    storageBucket: "top-to-do-d45c1.appspot.com",
    messagingSenderId: "221033452079",
    appId: "1:221033452079:web:02d9e16ca8976bbfe42cda"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database =  getDatabase(app);
let dbTodoList = [];
let dbProjList = [];
let todoListener = null;
let projListener = null;

function writeData(listName, list) {
    const userID = getAuth().currentUser.uid;
    set(ref(database, `${listName}/` + userID), {list});
}

const getTodoList  = () => {
    if (dbTodoList !== null) {
        return [...dbTodoList.list]
    } else {
        return null;
    }
};

const getProjList  = () => {
    if (dbProjList !== null) {
        return [...dbProjList.list]
    } else {
        return null;
    }
};

const signIn = async () => {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
};

const signOutUser = () => {
    // Sign out of Firebase.
    signOut(getAuth());
    // Unsubscribe from list listeners
    todoListener();
    projListener();
};

const initFirebaseAuth = () => {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
};

const authStateObserver = (user) => {
    const userNameElem = document.getElementById('user-name');
    const signInElem = document.getElementById('sign-in');
    const signOutElem = document.getElementById('sign-out');

    if (user) {
        // User is signed in!
        console.log('signed IN');
        const userName = getUserName();
        userNameElem.innerText = userName;
        userNameElem.removeAttribute('hidden');
        signOutElem.removeAttribute('hidden');
        signInElem.setAttribute('hidden', 'true');
        
        const userID = user.uid;
        const todoListRef = ref(database, `todo/` + userID);
        const projectListRef = ref(database, `project/` + userID);
        todoListener = onValue(todoListRef, (snapshot) => {
            dbTodoList = snapshot.val();
            console.log(dbTodoList);
        });
        projListener = onValue(projectListRef, (snapshot) => {
            dbProjList = snapshot.val();
            console.log(dbProjList);
            list.loadList();
            contentUpdater.refreshContent(filterLists.byAll(), 'All');
            listener.clickAll();
            listener.enterKey();
        });

    } else {
        // User is signed out!
        console.log('signed OUT');
        userNameElem.innerText = '';
        userNameElem.setAttribute('hidden', 'true');
        signOutElem.setAttribute('hidden', 'true');
        signInElem.removeAttribute('hidden');
        list.loadList();
        contentUpdater.refreshContent(filterLists.byAll(), 'All');
        listener.clickAll();
        listener.enterKey();
    }
};

// Returns the signed-in user's display name.
const getUserName = () => {
    return getAuth().currentUser.displayName;
};

const isUserSignedIn = () => {
    return !!getAuth().currentUser;
}

return { signIn, signOutUser, initFirebaseAuth, isUserSignedIn, writeData, getTodoList, getProjList };
})();

export { firebase };