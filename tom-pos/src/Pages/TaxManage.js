import '../Styles/TaxPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc, setDB } from '../Util/firebaseDB';
import TaxRow from '../Components/TaxRow';

const TaxManage = () => {
    const [taxData, setTaxData] = useState({});
    const [tempData, setTempData] = useState({});

    //on initial render load in data from firebase db
    useEffect(() => {
        const getTaxData = async () => {
            const taxSnap = await getDBDoc('tax-bands');
            const snapData = taxSnap.data();
            setTaxData(snapData);
            setTempData(snapData);
        };
        getTaxData();
    }, []);

    //set states and firebase db
    const updateTax = (taxObj) => {
        setTaxData({...taxObj});
        setTempData({...taxObj});
        setDB({...taxObj}, 'tax-bands');
    };

    const deleteTax = (label) => {
        let deleteData = {...tempData};
        delete deleteData[label];
        setTaxData(deleteData);
        setTempData(deleteData);
        setDB(deleteData, 'tax-bands');
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
                        Object.keys(tempData).sort().map((label, i) => <TaxRow key={i} 
                            data={tempData} label={label} updateTax={updateTax} deleteTax={deleteTax}/>)
                    }
                    <button type='button'>Add Tax Rate</button>
                </div>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/menu' className='foot-link'>Home</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

export default TaxManage;