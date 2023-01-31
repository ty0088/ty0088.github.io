import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import fireApp from './firebaseApp';

const db = getFirestore(fireApp);

//add new user, create user collection and set up user DB documents
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
        await setDoc(doc(db, user.uid, "financial"), {'daily-cash': [], 'day-settings': {'time-start': '00:00', 'time-end': '23:59', 'end-next-day': false}}); //default start and end time
        await setDoc(doc(db, user.uid, "items"), {});
        await setDoc(doc(db, user.uid, "orders"), {});
        await setDoc(doc(db, user.uid, "sub-menus"), {});
        await setDoc(doc(db, user.uid, "tax-bands"), {});
        await setDoc(doc(db, user.uid, "user-data"), userData);
    } catch (error) {
        console.log(error);
    }
};

//Add or overwrite a db document
const setDB = async (obj, dbDoc) => {
    const user = getAuth().currentUser;
    try {
        await setDoc(doc(db, user.uid, dbDoc), obj);
    } catch (error) {
        console.log(error);
    }
};

//get all documents from user collection
const getDBCol = async () => {
    const user = getAuth().currentUser;
    try {
        const colSnap = await getDocs(collection(db, user.uid));
        return colSnap;
    } catch (error) {
        console.log(error);
    }
};

//delete user collection and all user documents 
const deleteAllDocs = async () => {
    const user = getAuth().currentUser;
    try {
        await deleteDoc(doc(db, user.uid, "financial"));
        await deleteDoc(doc(db, user.uid, "items"));
        await deleteDoc(doc(db, user.uid, "orders"));
        await deleteDoc(doc(db, user.uid, "sub-menus"));
        await deleteDoc(doc(db, user.uid, "tax-bands"));
        await deleteDoc(doc(db, user.uid, "user-data"));
        console.log('All documents deleted');
    } catch (error) {
        console.log(error);
    }
};

export { addUser, setDB, getDBCol, deleteAllDocs };