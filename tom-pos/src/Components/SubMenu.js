import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc } from '../Util/firebaseDB';
import SubMenuPath from './SubMenuPath';

const SubMenu = () => {
    const [menuFlag, setMenuFlag] = useState(true);
    const [menuPaths, setMenuPaths] = useState([]);
    const [newPath, setNewPath] = useState({});
    const [menuKeys, setMenuKeys] = useState([]);
    
    //get sub menu and render menu paths on intial render
    useEffect(() => {
        const getSubMenu = async () => {
            const menuSnap = await getDBDoc('sub-menus');
            const tempData = menuSnap.data();
            setMenuKeys(getMenuKeys(tempData));
            setMenuPaths(getMenuPaths(tempData));
            Object.keys(tempData).length > 0 ? setMenuFlag(true) : setMenuFlag(false);
        };
        getSubMenu();
        // eslint-disable-next-line
    }, []);

    //update sub menu db when new path is submitted
    useEffect(() => {
        if (Object.keys(newPath).length > 0) {
            console.log(newPath)
            //update MenuPaths------------
            //Update menu db---------------
        }
    }, [newPath]);

    //return all menu keys
    const getMenuKeys = (tempData) => {
        let keyArr = [];
        Object.keys(tempData).forEach(level => Object.keys(tempData[level]).forEach(key => keyArr.push(key)));
        return keyArr;
    };  

    //return all possible menu path combinations
    const getMenuPaths = (tempData) => {
        let menuArr = [];
        let maxLevel = Object.keys(tempData).length - 1;
        //find the root path of a given menu key, returned in an array
        const getPath = (lvl, key, tempData) => {
            const path = [key];
            let tempKey = key;
            for (let i = lvl; i > 0; i--) {
                let parent = tempData[i][tempKey];
                path.push(parent);
                tempKey = parent;
            }
            return path.reverse();
        };
        //check all sub menu levels for an end sub menu
        for (let i = maxLevel; i >= 0; i--) {
            for (let subKey of Object.keys(tempData[i]).sort()) {
                //if sub menu is an end one, get the root path and store it
                if (isMenuEnd(i, subKey, tempData)) {
                    menuArr.push(getPath(i, subKey, tempData));
                }
            }
        }
        console.log(menuArr)
        return menuArr.sort();
    };

    //determine if the current menu has no further child menus
    const isMenuEnd = (currLevel, currKey, tempData) => {
        const nextLevel = currLevel + 1;
        if (!!tempData[nextLevel]) {
            const nextMenuValues = Object.values(tempData[nextLevel]);
            return (nextMenuValues.includes(currKey)) ? false : true;
        } else {
            return true;
        }
    };



    const SubMenuForm = () => {
        return (
            <div id='sub-menu-form'>
                <h1>Sub Menu Management</h1>
                {menuPaths.map((path, i) => <SubMenuPath key={i} i={i} path={path} menuKeys={menuKeys} setNewPath={setNewPath}/>)}
                <button type='button'>Add new Sub Menu</button>
            </div>
        );
    };

    return (
        <div id='sub-menu-container'>
            {menuFlag &&
                <SubMenuForm />
            }
            <div className='nav-footer'>
                <Link to='/tom-pos/menu' className='foot-link'>Home</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

export default SubMenu;