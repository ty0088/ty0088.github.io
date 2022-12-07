//updates item(s) property value
const updateItemVal = (vals, newVal, prop, setRootData, itemData) => {
    vals.forEach(val => {
        const matchIDs = Object.keys(itemData).filter(itemID => itemData[itemID][prop] === val[0]);
        matchIDs.forEach(itemID => itemData[itemID][prop] = newVal);
    });
    setRootData(itemData, 'items');
};

export default updateItemVal;