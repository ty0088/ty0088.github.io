//updates item(s) property value
const updateItemVal = (vals, newVal, prop, setDataDB, itemData) => {
    vals.forEach(val => {
        const matchIDs = Object.keys(itemData).filter(itemID => itemData[itemID][prop] === val[0]);
        matchIDs.forEach(itemID => itemData[itemID][prop] = newVal);
    });
    setDataDB(itemData, 'items');
};

export default updateItemVal;