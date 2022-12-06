import '../Styles/TaxPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import TaxRow from '../Components/TaxRow';
import updateItemVal from '../Util/updateItemVal';

//headers to be fixed and rows to have own container to be scrollable ----------------
//setTaxData and setItemsData, set root data objs when updating or deleting ---------------

const TaxManage = ({taxData, itemsData, setDataDB}) => {
    const [tempData, setTempData] = useState({});

    useEffect(() => {
        setTempData({...taxData});
    }, [taxData])

    const updateTaxDB = (taxObj) => {
        setTempData(taxObj);
        setDataDB(taxObj, 'tax-bands'); 
    };

    const deleteTax = (label) => {
        let deleteData = {...tempData};
        delete deleteData[label];
        setTempData(deleteData);
        setDataDB(deleteData, 'tax-bands'); 
        updateItemVal([[label]], '', 'tax-band', setDataDB, itemsData);
    };

    const addTaxClick = () => {
        const addData = {...tempData, '': 0};
        setTempData(addData);
    };

    const cancelAdd = () => {
        setTempData({...taxData});
    };

    return (
        <div id='tax-page-container'>
            <div id='tax-form'>
                <h1>Value-Added Tax Management</h1>
                <div id='tax-form-headers'>
                    <span>Tax Label</span>
                    <span>Tax Rate %</span>
                </div>
                <div id='tax-content'>
                    {Object.keys(tempData).length > 0 &&
                        Object.keys(tempData).sort().map((label, i) => <TaxRow key={i} data={tempData} 
                            label={label} updateTaxDB={updateTaxDB} deleteTax={deleteTax} cancelAdd={cancelAdd}
                            setDataDB={setDataDB} itemsData={itemsData} />)
                    }
                    <button type='button' onClick={addTaxClick}>Add Tax Rate</button>
                </div>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

export default TaxManage;