import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc } from '../Util/firebaseDB';

const POS = () => {
    const [menuFlag, setMenuFlag] = useState(false);
    const [itemFlag, setItemFlag] = useState(false);
    const [menuData, setMenuData] = useState(null);
    const [menuKeys, setMenuKeys] = useState(null);
    const [parentKey, setParentKey] = useState(null);
    const [currLevel, setCurrLevel] = useState(0);
    const [menuPath, setMenuPath] = useState([]);

    //on initial render get sub-menu keys and render initial menu buttons
    useEffect(() => {
        const renderInitMenu = async () => {
            const menuSnap = await getDBDoc('sub-menus');
            const initMenuData = menuSnap.data();
            setMenuData(initMenuData);
            const initMenuKeys = Object.keys(initMenuData[0]).sort();
            if (initMenuKeys.length > 0 ) {
                setMenuKeys(initMenuKeys);
                setMenuFlag(true);
            } else {
                setMenuFlag(false);
                setItemFlag(false);
                // if no sub menus, just render items -----------------
                //if no sub menus or items, display message -----------
            }
        }
        renderInitMenu();
    }, [])

    const renderSubMenu = (menuParent) => {
        const maxLevel = Object.keys(menuData).length;
        const nextLevel = currLevel + 1;
        if (nextLevel < maxLevel) {
            const menuKeys = Object.keys(menuData[nextLevel]).filter(key => menuData[nextLevel][key] === menuParent).sort();
            if (menuKeys.length > 0) {
                setCurrLevel(currLevel + 1);
                setMenuKeys(menuKeys);
                setParentKey(menuParent);
                setMenuPath([...menuPath, menuParent]);
            } else if (menuKeys.length === 0 && menuFlag){
                //render items
    
            }
        }
    };

    const menuBack = () => {
        const prevLevel = currLevel - 1;
        if (prevLevel >= 0) {
            const prevParent = menuData[prevLevel][parentKey];
            const menuKeys = Object.keys(menuData[prevLevel]).filter(key => menuData[prevLevel][key] === prevParent).sort();
            setCurrLevel(currLevel - 1);
            setMenuKeys(menuKeys);
            setParentKey(prevParent);
            const menuPathCopy = menuPath.slice(0, prevLevel);
            setMenuPath(menuPathCopy);
        }
    };

    const linkPath = (e) => {
        const parentMenu = e.target.textContent;
        console.log(parentMenu);
    };

    const MenuNav = () => {
        return (
            <div id='menu-nav-bar'>
                {menuPath.map((path, i) => {
                    return (
                        <span key={i} className='menu-nav-link' onClick={linkPath}> 
                            <span className="material-symbols-outlined">arrow_right</span>
                            <span>{path}</span>
                        </span>
                    );  
                })}
            </div>
        );
    };

    const MenuBtns = ({menuKeyArr}) => {
        return (
            <div className='btns-container'>
                {menuFlag && 
                    menuKeyArr.map((menuKey, i) => {
                        return (
                            <button className='menu-btn' type='button' key={i} onClick={() => renderSubMenu(menuKey)}>{menuKey}</button>
                        );
                    })
                }
            </div>
        );
    };

    const ItemBtns = () => {
        return (
            <div className='btns-container'>

            </div>
        );
    };

    //if user logged in, render POS, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id='pos-container'>
                <div id='pos-nav'>
                    <Link to='/tom-pos/menu' className='pos-nav-link'>Menu</Link>
                    <Link onClick={signOutAcc} className='pos-nav-link'>Sign Out</Link>
                </div>
                <div id='order-head'>
                    Order #123
                </div>
                <div id='menu-container'>
                    <div id='menu-nav-bar'>
                        <span id='menu-go-back' className="material-symbols-outlined" onClick={menuBack}>arrow_back</span>
                        <MenuNav />
                    </div>
                    {menuFlag && 
                        <MenuBtns menuKeyArr={menuKeys}/>
                    }
                    {!menuFlag &&
                        <span>You have no menus set up, please go to the <Link to='/tom-pos/backend'>back end</Link> and set some up</span>
                    }
                    {itemFlag &&
                        <ItemBtns />
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

export default POS;