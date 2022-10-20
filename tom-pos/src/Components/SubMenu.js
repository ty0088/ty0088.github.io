import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc } from '../Util/firebaseDB';
import LevelRow from './LevelRow';

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
        const newData = {...menuData, [menuLevel]: {...menuData[menuLevel], '--Add Menu--': ''}};
        setTempData(newData);
    };

    const cancelEdit = () => {
        setTempData({...menuData});
    };

    const submitEdit = (menu, parent, level) => {
        console.log(`menu: ${menu}, parent: ${parent}, level: ${level}`);
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
                                                cancelEdit={cancelEdit} submitEdit={submitEdit}/>)
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