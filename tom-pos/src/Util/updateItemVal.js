import { getDBDoc, setDB } from './firebaseDB';

const updateItemVal = async (vals, newVal, prop) => {
    const itemSnap = await getDBDoc('items');
    const itemData = itemSnap.data();
    vals.forEach(val => {
        const matchIDs = Object.keys(itemData).filter(itemID => itemData[itemID][prop] === val[0]);
        matchIDs.forEach(itemID => itemData[itemID][prop] = newVal);
    });
    setDB(itemData, 'items');
};

export default updateItemVal;