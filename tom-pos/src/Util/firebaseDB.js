import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import fireApp from './firebaseApp';
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(fireApp);
// eslint-disable-next-line
const itemObj = {
    itemID: 0,
    "sub-menu": "",
    itemName: "",
    description: "",
    options: [],
    mods: [],
    qty: 0,
    price: 0,
    "tax-band": "",
    cost: 0,
    "print-kitchen": false,
    "print-customer": true
};

const addUser = async (firstName, lastName, compName, email, phoneNo) => {
    const user = getAuth().currentUser;
    const userData = {firstName, lastName, compName, email, phoneNo};
    try {
        await setDoc(doc(db, user.uid, "user-data"), userData);
        await setDoc(doc(db, user.uid, "sub-menus"), {});
        await setDoc(doc(db, user.uid, "items"), {});
        await setDoc(doc(db, user.uid, "orders"), {});
        await setDoc(doc(db, user.uid, "Tax Bands"), {});
        await setDoc(doc(db, user.uid, "Financial"), {});
    } catch (error) {
        console.log(error);
    }
};

const addItem = async (subMenu, name, description, options, mods, qty, price, taxBand, cost, custReceipt, kitchReceipt) => {
    const user = getAuth().currentUser;
    const itemID = uuidv4();
    const itemObj = {
        "itemID": itemID,
        "sub-menu": subMenu,
        "item-name": name,
        "description": description,
        "options": options,
        "mods": mods,
        "qty": qty,
        "price": price,
        "tax-band": taxBand,
        "cost": cost,
        "print-kitchen": kitchReceipt,
        "print-customer": custReceipt
    };
    try {
        await updateDoc(doc(db, user.uid, "items"), {[itemID]:itemObj});
    } catch (error) {
        console.log(error);
    }
};

const updateItemDB = async (itemData) => {
    const user = getAuth().currentUser;
    try {
        await updateDoc(doc(db, user.uid, "items"), itemData);
    } catch (error) {
        console.log(error);
    }
};

const addSubMenuDB = async (menuObj) => {
    const user = getAuth().currentUser;
    try {
        await setDoc(doc(db, user.uid, "sub-menus"), menuObj);
    } catch (error) {
        console.log(error);
    }
};

const getDBDoc = async (docRef) => {
    const user = getAuth().currentUser;
    const errorMessage = { code : 404, message : `${docRef} document NOT found` };
    try {
        const docSnap = await getDoc(doc(db, user.uid, docRef))
        if (docSnap.exists()) {
            console.log(`${docRef} found`);
            return docSnap;
        } else {
            console.log(`${docRef} NOT found`);
            throw errorMessage;
        }
    } catch (error) {
        console.log(error);
    }
};

export { addUser, addSubMenuDB, getDBDoc, addItem, updateItemDB };