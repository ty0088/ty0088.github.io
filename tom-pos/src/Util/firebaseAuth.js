import { 
    getAuth,
    signOut,
    updateEmail,
    updatePassword,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential
} from "firebase/auth";
import { deleteAllDocs } from "./firebaseDB";

const auth = getAuth();

const signOutAcc = () => {
    signOut(auth).catch((error) => {
        console.log(`${error.code}: ${error.message}`);
    });
};

const isUserSignedIn = () => {
    return !!getAuth().currentUser;
};

const updateUserEmail = (email) => {
    updateEmail(auth.currentUser, email).then(() => {
        console.log(`Email updated to ${email}`);
    }).catch((error) => {
        console.log(`${error.code}: ${error.message}`);
    });
};

const updateUserPassword = (password) => {
    updatePassword(auth.currentUser, password).then(() => {
        console.log('Update successful');
    }).catch((error) => {
        console.log(`${error.code}: ${error.message}`);
    });
};

const deleteUserAcc = async () => {
    try {
        await deleteAllDocs();
        await deleteUser(auth.currentUser);
        console.log('User account deleted');
    } catch (error) {
        console.log(`${error.code}: ${error.message}`);
    }
};

const reAuthUser = async (password) => {
    try {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        const userCredential = await reauthenticateWithCredential(auth.currentUser, credential);
        console.log(`User ${userCredential.user.uid} is re-authenticated`);
        return true;
    } catch (error) {
        console.log(`${error.code}: ${error.message}`);
        return false;
    }
};

export {
    signOutAcc,
    isUserSignedIn,
    updateUserEmail,
    updateUserPassword,
    deleteUserAcc,
    reAuthUser
};
