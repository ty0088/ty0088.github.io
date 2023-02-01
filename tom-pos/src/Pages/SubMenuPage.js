import '../Styles/SubMenuPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import MenuRow from '../Components/MenuRow';
import updateItemVal from '../Util/updateItemVal';
import HelpPopUp from '../Components/HelpPopUp';


const SubMenuPage = ({menusData, itemsData, setRootData}) => {
    const [helpFlag, setHelpFlag] = useState(false);
    const [tempData, setTempData] = useState({});
    const [levels, setLevels] = useState([]);

    //set temp data with root data and get all levels from root data
    useEffect(() => {
        setTempData({...menusData});
        setLevels(Object.keys(menusData).map(string => parseInt(string)));
    }, [menusData])

    //adds new menu to level
    const clickNewMenu = (e) => {
        const menuLevel = e.target.parentNode.getAttribute('data-level');
        const addMenu = {...tempData, [menuLevel]: {...tempData[menuLevel], '': ''}};
        setTempData(addMenu);
    };

    //cancel edit - set levels and temp data back to root data
    const cancelEdit = () => {
        setLevels(Object.keys(menusData).map(string => parseInt(string)));
        setTempData({...menusData});
    };

    //submit changes
    const submitChange = (newMenu, newParent, level, prevMenu) => {
        //if root level, set parent to "Menu" for db use
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
            if (editData[nextLevel]) {
                const changeMenus = Object.keys(editData[nextLevel]).filter(menu => editData[nextLevel][menu] === prevMenu);
                changeMenus.forEach(menu => editData[nextLevel][menu] = newMenu);
            }
        }
        //remove any empty levels
        Object.keys(editData).forEach(level => { if (Object.keys(editData[level]).length === 0) delete editData[level] });
        //update Item sub menu property if previous menu was NOT blank i.e. a new sub menu
        if (prevMenu !== '') {
            updateItemVal([[prevMenu]], newMenu, 'sub-menu', setRootData, itemsData);
        }
        setTempData(editData);
        setRootData(editData, 'sub-menus');
        setLevels(Object.keys(editData).map(string => parseInt(string)));
    };

    //delete sub menu and all subsequently related sub menus
    const deleteMenu = (menu, level) => {
        let deleteData = {...tempData};
        //delete all related sub menus
        const menus = relatedMenus(menu, level);
        menus.forEach(([menu, level]) => {
            delete deleteData[level][menu];
        });
        //Remove related menus from items
        updateItemVal(menus, '', 'sub-menu', setRootData, itemsData);
        //remove any empty levels and update data
        Object.keys(deleteData).forEach(level => { if (Object.keys(deleteData[level]).length === 0) delete deleteData[level] });
        setTempData(deleteData);
        setRootData(deleteData, 'sub-menus');
        setLevels(Object.keys(deleteData).map(string => parseInt(string)));
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
    };

    //adds new level to menu data
    const addNewLevel = () => {
        const nextLevel = Object.keys(tempData).length;
        let addData = {...tempData, [nextLevel]: {}};
        setTempData(addData);
        setLevels(Object.keys(addData).map(string => parseInt(string)));
    };

    //prompt help page
    const helpClick = () => {
        setHelpFlag(!helpFlag);
    };
 
    return (
        <div id='menu-page-container'>
            <div id='sub-menu-form'>
                <h1>Sub Menu Management</h1>
                <div id='menu-form-headers'>
                    <span>Level</span>
                    <span>Sub Menu Name</span>
                    <span>Sub Menu Parent</span>
                </div>
                <div id='menu-content'>
                    {levels.length > 0 &&
                        levels.map(level => {
                            return (
                                <div key={level} className='menu-level'>
                                    <div className='level-text'>{level + 1}</div>
                                    <div className='level-container' data-level={level}>
                                        {Object.keys(tempData[level]).length > 0 &&
                                            Object.keys(tempData[level]).sort().map((menu, i) => 
                                                <MenuRow key={i} level={level} menuData={tempData} id={`l${level}i${i}`} menu={menu}
                                                cancelEdit={cancelEdit} submitChange={submitChange} deleteMenu={deleteMenu} />)
                                        }
                                        {Object.keys(tempData[level]).length === 0 &&
                                            <span>Add a new menu to this level</span>
                                        }
                                        <button type='button' className='menuBtn' onClick={clickNewMenu}>Add New Menu</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {levels.length === 0 &&
                        <div className='level-container'>
                            <span>Add at least level 1 to add menus</span>
                            <span>Each level can have multiple menus added</span>
                            <span>Level 1 is the root level of your menus</span>
                            <span>Each menu has a parent menu from the previous level</span>
                            <span>Type the menu name and choose the parent menu from the dropdown list</span>
                            <span>Please do not use the following words for menu names</span>
                            <span>These are reserved for the system:</span>
                            <span>'--Add Menu--', 'Menu', 'N/A'</span>
                        </div>
                    }
                </div>
                <button type='button' className='menuBtn' onClick={addNewLevel}>Add New Level</button>
            </div>
            <div className='nav-footer'>
                <span className='foot-link link' onClick={helpClick}>Page Help</span>
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            {helpFlag &&
                <HelpPopUp helpClick={helpClick}>
                    <span id='help-title'>Sub Menu Management Page</span>
                    <p className='help-para'>This page allows you to add and edit sub menus. Sub menus are assigned to individual
                         items to allow you to group and categorise items. Sub menus are not neccessary and can be used or not used.</p>
                    <p className='help-para'>Each sub menu will show up in the POS as a button which allows the user to bring up a grouping of items.</p>
                    <p className='help-para'>Sub menus belong to a 'level', level 1 being the root level. To create a sub menu, add at least level 1.
                         A sub menu belonging to a level higher than level 1 has a parent sub menu from the immediate level lower i.e. sub menu on level 2 has a parent
                         sub menu on level 1 and a sub menu on level 3 has a parent from level 2 and so on. This allows you to create sub menus within sub menus as shallow and deep as you would like.</p>
                    <p className='help-para'>If no sub menus are used, all items will belong to the root menu. Items can belong to the root menu even
                         if there are sub menus available. If an item belongs to the root menu, it will show immediately in the POS without any sub menu having
                         to be selected.</p>
                    <p className='help-para'>To add a new sub menu:</p>
                    <p className='help-para'>1. First ensure that the relevant level is present. If no level is present or a higher level is required,
                         click "Add New Level".</p>
                    <p className='help-para'>2. Click "Add New menu" in the required level and type in the name of the new sub menu. Now select it's parent sub menu.
                         Any sub menu in level 1 (root) has no parent and so it's parent is shown as "N/A".</p>
                    <p className='help-para'>Note that the following names are reserved for the system and so cannot be used as sub menu names:</p>
                    <p className='help-para'><b> "--Add Menu--",  "Menu",  "N/A"</b></p>
                </HelpPopUp>
            }
        </div>
    );
};

export default SubMenuPage;