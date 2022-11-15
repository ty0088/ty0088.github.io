import { getDBDoc, setDB } from './firebaseDB';

const updateItemMenu = async (menus, newMenu) => {
    const itemSnap = await getDBDoc('items');
    const itemData = itemSnap.data();
    menus.forEach(menu => {
        const matchIDs = Object.keys(itemData).filter(itemID => itemData[itemID]['sub-menu'] === menu[0]);
        matchIDs.forEach(itemID => itemData[itemID]['sub-menu'] = newMenu);
    });
    setDB(itemData, 'items');
};

export default updateItemMenu;