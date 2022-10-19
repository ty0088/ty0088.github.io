import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc } from '../Util/firebaseDB';
import SubMenuComp from './SubMenuComp';

const SubMenu = () => {
    const [menuData, setMenuData] = useState({});
    
    //on initial render load in data from firebase db
    useEffect(() => {
        const getSubMenu = async () => {
            const menuSnap = await getDBDoc('sub-menus');
            const dbData = menuSnap.data();
            setMenuData(dbData);
            console.log(dbData);
        };
        getSubMenu();
    }, []);
 
    return (
        <div id='menu-page-container'>
            <div id='sub-menu-form'>
                <h1>Sub Menu Management</h1>
                <div id='menu-form-headers'>
                    <span>Level</span>
                    <span>Sub Menu Name</span>
                    <span>Sub Menu Parent</span>
                </div>
                <SubMenuComp menuData={menuData} />
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