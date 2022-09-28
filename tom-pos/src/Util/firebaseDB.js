import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import fireApp from "./firebaseApp";

const db = getFirestore(fireApp);
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

export { addUser };