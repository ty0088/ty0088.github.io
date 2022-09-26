import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import fireApp from "./firebaseApp";

const db = getFirestore(fireApp);

const addUserData = async (firstName, lastName, compName, email, phoneNo) => {
    const user = getAuth().currentUser;
    try {
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            compName,
            email,
            phoneNo
        });
    } catch (error) {
        console.log(error);
    }
};

export { addUserData };