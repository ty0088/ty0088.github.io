import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutAcc } from '../Util/firebaseAuth';
// import { getDBDoc } from '../Util/firebaseDB'; -----------
import POSMenu from '../Components/POSMenu';
import OrderTab from '../Components/OrderTab';

const POS = () => {
    // const [menuFlag, setMenuFlag] = useState(false);
    // const [itemFlag, setItemFlag] = useState(false);
    // const [menuData, setMenuData] = useState({});
    // const [menuKeys, setMenuKeys] = useState([]);
    // const [itemData, setItemData] = useState({});
    // const [menuItems, setMenuItems] = useState([]);
    // const [parentKey, setParentKey] = useState('Menu');
    // const [currLevel, setCurrLevel] = useState(0);
    // const [navPath, setNavPath] = useState([]);

    // //on initial render get sub-menu keys and set initial menu buttons and any initial items
    // useEffect(() => {
    //     const setInitMenu = async () => {
    //         //get sub menu data from firestore
    //         const menuSnap = await getDBDoc('sub-menus');
    //         const menuData = menuSnap.data();
    //         setMenuData(menuData);
    //         const initMenuKeys = Object.keys(menuData[0]).sort();
    //         //get item data from firestore
    //         const itemSnap = await getDBDoc('items');
    //         const tempItemData = itemSnap.data();
    //         setItemData(tempItemData);
    //         if (initMenuKeys.length > 0 ) {
    //             setMenuKeys(initMenuKeys);
    //             setMenuFlag(true);
    //         } else {
    //             setMenuFlag(false);
    //         }
    //         setItems(parentKey, tempItemData);
    //     }
    //     setInitMenu();
    // // eslint-disable-next-line
    // }, [])

    // //set sub menu to menu/nav link clicked
    // const setSubMenu = (e) => {
    //     let parentMenu = e.target.textContent;
    //     let clickLevel = 0;
    //     let nextLevel = 0;
    //     let nextKeys = [];
    //     //if root menu selected, set root menu, otherwise find next menu
    //     if (parentMenu === 'Menu') {
    //         nextKeys = Object.keys(menuData[0]).sort();
    //         setMenuFlag(true);
    //         setCurrLevel(nextLevel);
    //         setMenuKeys(nextKeys);
    //         setParentKey(parentMenu);
    //     } else {
    //         clickLevel = parseInt(Object.keys(menuData).find(level => Object.keys(menuData[level]).find(menu => menu === parentMenu)));
    //         nextLevel = clickLevel + 1;
    //         //if not an end menu, set the next menu
    //         //otherwise do not set and display next menu
    //         if (!isMenuEnd(clickLevel, parentMenu)) {
    //             nextKeys = Object.keys(menuData[nextLevel]).filter(key => menuData[nextLevel][key] === parentMenu).sort();
    //             setMenuFlag(true);
    //             setCurrLevel(nextLevel);
    //             setMenuKeys(nextKeys);
    //             setParentKey(parentMenu);
    //         } else {
    //             setMenuFlag(false);
    //         }
    //     }
    //     //set menu nav links
    //     if (nextLevel > currLevel && navPath.length <= clickLevel) {
    //         setNavPath([...navPath, parentMenu]);
    //     } else {
    //         setNavPath(navPath.slice(0, nextLevel));
    //     }
    //     //set any items belonging to menu
    //     setItems(parentMenu, itemData);
    // };

    // //set sub menu one level back
    // const menuBack = () => {
    //     let menuPathCopy = [];
    //     if (isMenuEnd(currLevel, parentKey) && !menuFlag) {
    //         menuPathCopy = navPath.slice(0, currLevel);
    //         setMenuFlag(true);
    //         setItems(parentKey, itemData)
    //     } else {
    //         const prevLevel = currLevel - 1;
    //         if (prevLevel >= 0) {
    //             const parentMenu = menuData[prevLevel][parentKey];
    //             const menuKeys = Object.keys(menuData[prevLevel]).filter(key => menuData[prevLevel][key] === parentMenu).sort();
    //             menuPathCopy = navPath.slice(0, prevLevel);
    //             setCurrLevel(prevLevel);
    //             setMenuKeys(menuKeys);
    //             setParentKey(parentMenu);
    //             setItems(parentMenu, itemData);
    //         }
    //     }
    //     setNavPath(menuPathCopy);
    // };

    // //find any items belonging to sub menu and set items
    // const setItems = (menuKey, data) => {
    //     //any items with no sub menu shall be displayed at root menu
    //     const menu = menuKey === 'Menu' ? '' : menuKey;
    //     const menuItemIDs = Object.keys(data).filter(itemID => data[itemID]['sub-menu'] === menu);
    //     let menuItemArr = menuItemIDs.map(ID => [data[ID]['item-name'], ID]);
    //     menuItemArr.sort();
    //     if (menuItemIDs.length > 0) {
    //         setMenuItems(menuItemArr);
    //         setItemFlag(true);
    //     } else {
    //         setItemFlag(false);
    //     }
    // };

    // //determines if the menu is end of branch
    // const isMenuEnd = (currLevel, currMenu) => {
    //     const nextLevel = currLevel + 1;
    //     if (!!menuData[nextLevel]) {
    //         const nextMenuValues = Object.values(menuData[nextLevel]);
    //         return (nextMenuValues.includes(currMenu)) ? false : true;
    //     } else {
    //         return true;
    //     }
    // };
    
    // //Menu nav bar component
    // const MenuNav = () => {
    //     return (
    //         <div id='menu-nav-bar'>
    //             <span className='menu-nav-elem link' onClick={setSubMenu}> 
    //                 Menu
    //             </span>
    //             {navPath.map((path, i) => {
    //                 return (
    //                     <span key={i} data-id={i} className='menu-nav-elem'> 
    //                         <span className='material-symbols-outlined'>arrow_right</span>
    //                         <span className='link' onClick={setSubMenu}>{path}</span>
    //                     </span>
    //                 );
    //             })}
    //         </div>
    //     );
    // };

    // //Menu button component
    // const MenuBtns = ({menuKeyArr}) => {
    //     return (
    //         <div className='btns-container'>
    //             {menuKeyArr.map((menuKey, i) => {
    //                 return (
    //                     <button className='menu-btn' type='button' key={i} onClick={setSubMenu}>{menuKey}</button>
    //                 );
    //             })}
    //         </div>
    //     );
    // };

    // //Item button component
    // const ItemBtns = () => {
    //     return (
    //         <div className='btns-container'>
    //             {menuItems.map((itemArr, i) => {
    //                 return (
    //                     <button className='item-btn' type='button' key={i} data-id={itemArr[1]} onClick={() => console.log(itemArr[0])}>{itemArr[0]}</button>
    //                 );
    //             })}
    //         </div>
    //     );
    // };
    
    // <div id='menu-container'>
    // <div id='menu-nav-bar'>
    //     <span id='menu-go-back' className='material-symbols-outlined' onClick={menuBack}>arrow_back</span>
    //     <MenuNav />
    // </div>
    // {menuFlag && 
    //     <MenuBtns menuKeyArr={menuKeys}/>
    // }
    // {itemFlag &&
    //     <ItemBtns />
    // }
    // {(!menuFlag && !itemFlag) &&
    //     <span>You have no items, please go to the <Link to='/tom-pos/backend'>back end</Link> and add some</span>
    // }
    // </div>

    //if user logged in, render POS, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id='pos-container'>
                <div id='pos-nav'>
                    <Link to='/tom-pos/home' className='pos-nav-link'>Home</Link>
                    <Link onClick={signOutAcc} className='pos-nav-link'>Sign Out</Link>
                </div>
                <div id='order-head'>
                    Order #123
                </div>
                <POSMenu />
                <OrderTab />
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

export default POS;

