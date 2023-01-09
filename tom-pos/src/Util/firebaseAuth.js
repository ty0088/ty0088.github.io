import { 
    getAuth,
    signOut,
    updateEmail,
    updatePassword,
    deleteUser
} from "firebase/auth";

const auth = getAuth();

const signOutAcc = () => {
    signOut(auth).catch((error) => {
        console.log(`${error.code}: ${error.message}`);
    });
};

const isUserSignedIn = () => {
    return !!getAuth().currentUser;
}

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

const deleteUserAcc = () => {
    deleteUser(auth.currentUser).then(() => {
        console.log('User account deleted');
    }).catch((error) => {
        console.log(`${error.code}: ${error.message}`);
    });
};

export {
    signOutAcc,
    isUserSignedIn,
    updateUserEmail,
    updateUserPassword,
    deleteUserAcc
};
