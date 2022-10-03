import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutAcc } from '../Util/firebaseAuth';
// eslint-disable-next-line
import { getDBDoc, addItem } from '../Util/firebaseDB';

const POS = () => {
    const [menuFlag, setMenuFlag] = useState(false);
    const [itemFlag, setItemFlag] = useState(false);
    const [menuData, setMenuData] = useState({});
    const [menuKeys, setMenuKeys] = useState(null);
    const [itemData, setItemData] = useState(null);
    const [menuItems, setMenuItems] = useState(null);
    const [parentKey, setParentKey] = useState('Menu');
    const [currLevel, setCurrLevel] = useState(0);
    const [menuPath, setMenuPath] = useState([]);

    //on initial render get sub-menu keys and set initial menu buttons and any initial items
    useEffect(() => {
        const setInitMenu = async () => {
            //get sub menu data from firestore
            const menuSnap = await getDBDoc('sub-menus');
            const menuData = menuSnap.data();
            setMenuData(menuData);
            const initMenuKeys = Object.keys(menuData[0]).sort();
            //get item data from firestore
            const itemSnap = await getDBDoc('items');
            const tempItemData = itemSnap.data();
            setItemData(tempItemData);
            if (initMenuKeys.length > 0 ) {
                setMenuKeys(initMenuKeys);
                setMenuFlag(true);
            } else {
                setMenuFlag(false);
            }
            setItems(parentKey, tempItemData);
        }
        setInitMenu();
    // eslint-disable-next-line
    }, [])

    //set sub menu of a parent menu and any items belonging to parent menu
    //if no further sub menus, set only items belonging to sub menu
    const setSubMenu = (parentMenu) => {
        const maxLevel = Object.keys(menuData).length;
        const nextLevel = currLevel + 1;
        //if next level exists, set next sub menu and any items, otherwise set just items
        if (nextLevel < maxLevel) {
            const menuKeys = Object.keys(menuData[nextLevel]).filter(key => menuData[nextLevel][key] === parentMenu).sort();
            if (menuKeys.length > 0) {
                setMenuFlag(true);
                setCurrLevel(nextLevel);
                setMenuKeys(menuKeys);
                setParentKey(parentMenu);
            }
        } 
        setMenuPath([...menuPath, parentMenu]);
        //if sub menu is end of branch setMenuFlag to false
        isMenuEnd(currLevel, parentMenu) ? setMenuFlag(false) : setMenuFlag(true);
        setItems(parentMenu, itemData);
    };

    //set sub menu of nav link clicked
    const linkPath = (e) => {
        let parentMenu = e.target.textContent;
        let nextLevel = 0;
        let menuKeys = [];
        if (parentMenu === 'Menu') {
            menuKeys = Object.keys(menuData[0]).sort();
        } else {
            const clickLevel = Object.keys(menuData).find(level => Object.keys(menuData[level]).find(menu => menu === parentMenu));
            nextLevel = parseInt(clickLevel) + 1;
            menuKeys = Object.keys(menuData[nextLevel]).filter(key => menuData[nextLevel][key] === parentMenu).sort();
        }
        const menuPathCopy = menuPath.slice(0, nextLevel);
        setParentKey(parentMenu);
        setCurrLevel(nextLevel);
        setMenuKeys(menuKeys);
        setMenuPath(menuPathCopy);
        //if sub menu is end of branch setMenuFlag to false
        isMenuEnd((nextLevel - 1), parentMenu) ? setMenuFlag(false) : setMenuFlag(true);
        setItems(parentMenu, itemData);
    };

    //set sub menu one level back
    const menuBack = () => {
        let menuPathCopy = [];
        if (isMenuEnd(currLevel, parentKey) && !menuFlag) {
            menuPathCopy = menuPath.slice(0, currLevel);
            setMenuFlag(true);
            setItems(parentKey, itemData)
        } else {
            const prevLevel = currLevel - 1;
            if (prevLevel >= 0) {
                const parentMenu = menuData[prevLevel][parentKey];
                const menuKeys = Object.keys(menuData[prevLevel]).filter(key => menuData[prevLevel][key] === parentMenu).sort();
                menuPathCopy = menuPath.slice(0, prevLevel);
                setCurrLevel(prevLevel);
                setMenuKeys(menuKeys);
                setParentKey(parentMenu);
                setItems(parentMenu, itemData);
            }
        }
        setMenuPath(menuPathCopy);
    };

    //find any items belonging to sub menu and set items
    const setItems = (menuKey, data) => {
        const menuItemIDs = Object.keys(data).filter(itemID => data[itemID]['sub-menu'][1] === menuKey);
        const menuItemArr = menuItemIDs.map(ID => [ID, itemData[ID]['item-name']]);
        if (menuItemIDs.length > 0) {
            setMenuItems(menuItemArr);
            setItemFlag(true);
        } else {
            setItemFlag(false);
        }
    };

    const isMenuEnd = (currLevel, currMenu) => {
        const nextLevel = currLevel + 1;
        if (!!menuData[nextLevel]) {
            const nextMenuValues = Object.values(menuData[nextLevel]);
            return (nextMenuValues.includes(currMenu)) ? false : true;
        } else {
            return true;
        }
    };
    
    //Menu nav bar component
    const MenuNav = () => {
        return (
            <div id='menu-nav-bar'>
                <span className='menu-nav-link' onClick={linkPath}> 
                    Menu
                </span>
                {menuPath.map((path, i) => {
                    return (
                        <span key={i} className='menu-nav-link'> 
                            <span className='material-symbols-outlined'>arrow_right</span>
                            <span onClick={linkPath}>{path}</span>
                        </span>
                    );  
                })}
            </div>
        );
    };

    //Menu button component
    const MenuBtns = ({menuKeyArr}) => {
        return (
            <div className='btns-container'>
                {menuKeyArr.map((menuKey, i) => {
                    return (
                        <button className='menu-btn' type='button' key={i} onClick={() => setSubMenu(menuKey)}>{menuKey}</button>
                    );
                })}
            </div>
        );
    };

    //Item button component
    const ItemBtns = () => {
        return (
            <div className='btns-container'>
                {menuItems.map((itemArr, i) => {
                    return (
                        <button className='item-btn' type='button' key={i} data-id={itemArr[0]} onClick={() => console.log(itemArr[1])}>{itemArr[1]}</button>
                    );
                })}
            </div>
        );
    };

    //if user logged in, render POS, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id='pos-container'>
                <div id='pos-nav'>
                    <Link to='/tom-pos/menu' className='pos-nav-link'>Home</Link>
                    <Link onClick={signOutAcc} className='pos-nav-link'>Sign Out</Link>
                </div>
                <div id='order-head'>
                    Order #123
                </div>
                <div id='menu-container'>
                    <div id='menu-nav-bar'>
                        <span id='menu-go-back' className='material-symbols-outlined' onClick={menuBack}>arrow_back</span>
                        <MenuNav />
                    </div>
                    {menuFlag && 
                        <MenuBtns menuKeyArr={menuKeys}/>
                    }
                    {itemFlag &&
                        <ItemBtns />
                    }
                    {(!menuFlag && !itemFlag) &&
                        <span>You have no menus or items, please go to the <Link to='/tom-pos/backend'>back end</Link> and add some</span>
                    }
                </div>
                <div id='order-tab'>
                    <div id='order-list-cont'></div>
                    <div id='order-sub-cont'>
                        <div id='sub-price-cont'></div>
                        <div id='sub-btn-cont'></div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id='pos-container'>
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        )
    }
};

// addItem([2, 'Beef'], 'Cheese Burger', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([2, 'Chicken'], 'Chicken Burger', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([2, 'Veg'], 'Veggie Burger', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([1, 'Mains'], 'Main Item', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([1, 'Sides'], 'Rosmary Fries', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([0, 'Food'], 'Food Item', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([0, 'Drinks'], 'Drink Item', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([1, 'Beers'], 'Lager', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([1, 'Soft'], 'Coke', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([1, 'Spirits'], 'Rum', '', {}, {}, 1, 10, 's', 0, true, true);
// addItem([1, 'Wine'], 'House Red', '', {}, {}, 1, 10, 's', 0, true, true);

export default POS;