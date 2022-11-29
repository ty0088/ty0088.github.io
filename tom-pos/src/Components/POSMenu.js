import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const POSMenu = ({itemsData, menusData, addItem}) => {
    const [menuFlag, setMenuFlag] = useState(false);
    const [itemFlag, setItemFlag] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [menuKeys, setMenuKeys] = useState([]);
    const [parentKey, setParentKey] = useState('Menu');
    const [currLevel, setCurrLevel] = useState(0);
    const [navPath, setNavPath] = useState([]);

    //on initial render get any root sub-menu buttons and any root items
    useEffect(() => {
        if (menusData) {
            let initMenuKeys = [];
            if (Object.keys(menusData).length > 0) {
                initMenuKeys = Object.keys(menusData[0]).sort();
            }
            if (initMenuKeys.length > 0 ) {
                setMenuKeys(initMenuKeys);
                setMenuFlag(true);
            } else {
                setMenuFlag(false);
            }
            setItems(parentKey, itemsData);
        }
    // eslint-disable-next-line
    }, []);

    //set sub menu to menu/nav link clicked
    const setSubMenu = (e) => {
        let parentMenu = e.target.textContent;
        let clickLevel = 0;
        let nextLevel = 0;
        let nextKeys = [];
        //if root menu selected, set root menu, otherwise find next menu
        if (parentMenu === 'Menu') {
            nextKeys = Object.keys(menusData[0]).sort();
            setMenuFlag(true);
            setCurrLevel(nextLevel);
            setMenuKeys(nextKeys);
            setParentKey(parentMenu);
        } else {
            clickLevel = parseInt(Object.keys(menusData).find(level => Object.keys(menusData[level]).find(menu => menu === parentMenu)));
            nextLevel = clickLevel + 1;
            //if not an end menu, set the next menu
            //otherwise do not set and display next menu
            if (!isMenuEnd(clickLevel, parentMenu)) {
                nextKeys = Object.keys(menusData[nextLevel]).filter(key => menusData[nextLevel][key] === parentMenu).sort();
                setMenuFlag(true);
                setCurrLevel(nextLevel);
                setMenuKeys(nextKeys);
                setParentKey(parentMenu);
            } else {
                setMenuFlag(false);
            }
        }
        //set menu nav links
        if (nextLevel > currLevel && navPath.length <= clickLevel) {
            setNavPath([...navPath, parentMenu]);
        } else {
            setNavPath(navPath.slice(0, nextLevel));
        }
        //set any items belonging to menu
        setItems(parentMenu, itemsData);
    };

    //set sub menu one level back
    const menuBack = () => {
        let menuPathCopy = [];
        if (isMenuEnd(currLevel, parentKey) && !menuFlag) {
            menuPathCopy = navPath.slice(0, currLevel);
            setMenuFlag(true);
            setItems(parentKey, itemsData);
        } else {
            const prevLevel = currLevel - 1;
            if (prevLevel >= 0) {
                const parentMenu = menusData[prevLevel][parentKey];
                const menuKeys = Object.keys(menusData[prevLevel]).filter(key => menusData[prevLevel][key] === parentMenu).sort();
                menuPathCopy = navPath.slice(0, prevLevel);
                setCurrLevel(prevLevel);
                setMenuKeys(menuKeys);
                setParentKey(parentMenu);
                setItems(parentMenu, itemsData);
            }
        }
        setNavPath(menuPathCopy);
    };

    //find any items belonging to sub menu and set items
    const setItems = (menuKey, data) => {
        //any items with no sub menu shall be displayed at root menu
        const menu = menuKey === 'Menu' ? '' : menuKey;
        const menuItemIDs = Object.keys(data).filter(itemID => data[itemID]['sub-menu'] === menu);
        let menuItemArr = menuItemIDs.map(ID => [data[ID]['item-name'], ID]);
        menuItemArr.sort();
        if (menuItemIDs.length > 0) {
            setMenuItems(menuItemArr);
            setItemFlag(true);
        } else {
            setItemFlag(false);
        }
    };

    //determines if the menu is end of branch
    const isMenuEnd = (currLevel, currMenu) => {
        const nextLevel = currLevel + 1;
        if (!!menusData[nextLevel]) {
            const nextMenuValues = Object.values(menusData[nextLevel]);
            return (nextMenuValues.includes(currMenu)) ? false : true;
        } else {
            return true;
        }
    };

    const itemClick = (e) => {
        const itemID = e.target.getAttribute('data-id');
        //check if mods/options available -------------
        //if mods/options available, prompt pop up and allow user to change mods/options and submit or cancel -------------
        //if not, call addItem
        addItem(itemID, [], [], '');
        console.log(itemsData[itemID]['item-name']);
    };
    
    //Menu nav bar component
    const MenuNav = () => {
        return (
            <div id='menu-nav-bar'>
                <span className='menu-nav-elem link' onClick={setSubMenu}> 
                    Menu
                </span>
                {navPath.map((path, i) => {
                    return (
                        <span key={i} data-id={i} className='menu-nav-elem'> 
                            <span className='material-symbols-outlined'>arrow_right</span>
                            <span className='link' onClick={setSubMenu}>{path}</span>
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
                        <button className='menu-btn' type='button' key={i} onClick={setSubMenu}>{menuKey}</button>
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
                        <button className='item-btn' type='button' key={i} data-id={itemArr[1]} onClick={itemClick}>{itemArr[0]}</button>
                    );
                })}
            </div>
        );
    };

    return (
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
                <span>You have no items, please go to the <Link to='/tom-pos/backend'>back end</Link> and add some</span>
            }
        </div>
    );
};

export default POSMenu;