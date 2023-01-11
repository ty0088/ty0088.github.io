import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import fireApp from './firebaseApp';

//Limit read and write to 1 per second ------------------------------------

const db = getFirestore(fireApp);

const addUser = async (firstName, lastName, compName, email, phoneNo) => {
    const user = getAuth().currentUser;
    const userData = {
        'first-name': firstName,
        'last-name': lastName,
        'comp-reg-name': compName,
        'comp-trade-name': '',
        'account-email': email,
        'contact-email': '',
        'account-phone': phoneNo,
        'contact-phone': '',
        'reg-address-1': '',
        'reg-address-2': '',
        'reg-address-town': '',
        'reg-address-county': '',
        'reg-address-postcode': '',
        'trade-address-1': '',
        'trade-address-2': '',
        'trade-address-town': '',
        'trade-address-county': '',
        'trade-address-postcode': '',
        'tax-ref': '',
        'receipt-message': 'Thank you'
    };

    try {
        await setDoc(doc(db, user.uid, "financial"), {});
        await setDoc(doc(db, user.uid, "items"), {});
        await setDoc(doc(db, user.uid, "orders"), {});
        await setDoc(doc(db, user.uid, "sub-menus"), {});
        await setDoc(doc(db, user.uid, "tax-bands"), {});
        await setDoc(doc(db, user.uid, "user-data"), userData);
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