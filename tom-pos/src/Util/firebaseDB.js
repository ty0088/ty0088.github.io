import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import fireApp from './firebaseApp';

const db = getFirestore(fireApp);

const addUser = async (firstName, lastName, compName, email, phoneNo) => {
    const user = getAuth().currentUser;
    const userData = {firstName, lastName, compName, email, phoneNo};
    try {
        await setDoc(doc(db, user.uid, "user-data"), userData);
        await setDoc(doc(db, user.uid, "sub-menus"), {});
        await setDoc(doc(db, user.uid, "items"), {});
        await setDoc(doc(db, user.uid, "orders"), {});
        await setDoc(doc(db, user.uid, "tax-bands"), {});
        await setDoc(doc(db, user.uid, "financial"), {});
    } catch (error) {
        console.log(error);
    }
};

const setDB = async (obj, dbDoc) => {
    const user = getAuth().currentUser;
    try {
        await setDoc(doc(db, user.uid, dbDoc), obj);
    } catch (error) {
        console.log(error);
    }
};

const getDBCol = async () => {
    const user = getAuth().currentUser;
    try {
        const colSnap = await getDocs(collection(db, user.uid));
        return colSnap;
    } catch (error) {
        console.log(error);
    }
};

export { addUser, setDB, getDBCol };