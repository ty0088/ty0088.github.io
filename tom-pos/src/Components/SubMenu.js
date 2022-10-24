import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc } from '../Util/firebaseDB';
import LevelRow from './LevelRow';
import { arrayRemove } from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';

const SubMenu = () => {
    const [menuData, setMenuData] = useState({});
    const [tempData, setTempData] = useState({});
    const [levels, setLevels] = useState([]);

    //on initial render load in data from firebase db
    useEffect(() => {
        const getSubMenu = async () => {
            const menuSnap = await getDBDoc('sub-menus');
            const dbData = menuSnap.data();
            setMenuData(dbData);
            setTempData(dbData);
            setLevels(Object.keys(dbData).map(string => parseInt(string)))
        };
        getSubMenu();
    }, []);


    const clickNewMenu = (e) => {
        const menuLevel = e.target.parentNode.getAttribute('data-level');
        const addMenu = {...menuData, [menuLevel]: {...menuData[menuLevel], '--Add Menu--': ''}};
        setTempData(addMenu);
    };

    const cancelEdit = () => {
        setTempData({...menuData});
    };

    const submitChange = (newMenu, newParent, level, prevMenu) => {
        //if top level, set parent to "Menu" for db use
        newParent = newParent === 'N/A' ? 'Menu' : newParent;
        //Add new menu/parent data or edit parent value
        let editData = {...tempData, [level]: {...tempData[level], [newMenu]: newParent}};
        //if new menu data, delete previous data
        if (newMenu !== prevMenu) {
            delete editData[level][prevMenu];
        } 
        //find children belonging to prev menu and change prev parent to new parent
        if (newMenu !== prevMenu && prevMenu !== '--Add Menu--') {
            const nextLevel = level + 1;
            //filter the next menus affected by change of parent menu
            const changeMenus = Object.keys(editData[nextLevel]).filter(menu => editData[nextLevel][menu] === prevMenu);
            changeMenus.forEach(menu => editData[nextLevel][menu] = newMenu);
        }
        setTempData(editData);
        setMenuData(editData);
        //submit to firebase db ------------
    };

    //delete sub menu and all subsequently related sub menus
    const deleteMenu = (menu, level) => {
        console.log(menu, level);
        let deleteData = {...tempData};
        //delete all related sub menus
        relatedMenus(menu, level).forEach(([menu, level]) => delete deleteData[level][menu]);
        //remove any empty levels in data obj
        Object.keys(deleteData).forEach(level => { if (Object.keys(deleteData[level]).length === 0) delete deleteData[level] });
        setTempData(deleteData);
        setMenuData(deleteData);
        setLevels(Object.keys(deleteData).map(string => parseInt(string)))
        //upload to firebase db --------
        console.log(deleteData);
    };

    //find all related subsequent menus
    const relatedMenus = (menu, level) => {
        const nextLevel = level + 1;
        if (!tempData[nextLevel] || !Object.values(tempData[nextLevel]).includes(menu)) {
            return [[menu, level]];
        } else {  
            let array = [[menu, level]];
            let currKeys = Object.keys(tempData[nextLevel]).filter(key => tempData[nextLevel][key] === menu);
            currKeys.forEach(key => array.push(...relatedMenus(key, nextLevel)));
            return array;   
        }    
    }
 
    return (
        <div id='menu-page-container'>
            <div id='sub-menu-form'>
                <h1>Sub Menu Management</h1>
                <div id='menu-form-headers'>
                    <span>Level</span>
                    <span>Sub Menu Name</span>
                    <span>Sub Menu Parent</span>
                </div>
                <div id='menu-component'>
                    {levels.length > 0 &&
                        levels.map(level => {
                            return (
                                <div key={level} className='menu-level'>
                                    <div className='level-text'>{level + 1}</div>
                                    <div className='level-container' data-level={level}>
                                        {
                                            Object.keys(tempData[level]).sort().map((menu, i) => 
                                                <LevelRow key={i} level={level} menuData={tempData} id={`l${level}i${i}`} menu={menu}
                                                cancelEdit={cancelEdit} submitChange={submitChange} deleteMenu={deleteMenu} />)
                                        }
                                        <button type='button' className='menuBtn' onClick={clickNewMenu}>Add New Menu</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <button type='button' className='menuBtn'>Add New Level</button>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/menu' className='foot-link'>Home</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

export default SubMenu;