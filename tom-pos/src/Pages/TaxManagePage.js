import '../Styles/TaxManagePage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import TaxRow from '../Components/TaxRow';
import updateItemVal from '../Util/updateItemVal';
import HelpPopUp from '../Components/HelpPopUp';

const TaxManagePage = ({taxData, itemsData, setRootData}) => {
    const [helpFlag, setHelpFlag] = useState(false);
    const [tempData, setTempData] = useState({});

    //copy tax data as temp data
    useEffect(() => {
        setTempData({...taxData});
    }, [taxData])

    //updates root tax data
    const updateTaxDB = (taxObj) => {
        setTempData(taxObj);
        setRootData(taxObj, 'tax-bands'); 
    };

    //deletes tax band from root data and removes tax band from any associated items
    const deleteTax = (label) => {
        let deleteData = {...tempData};
        delete deleteData[label];
        setTempData(deleteData);
        setRootData(deleteData, 'tax-bands'); 
        updateItemVal([[label]], '', 'tax-band', setRootData, itemsData);
    };

    //add a new tax band to temp data
    const addTaxClick = () => {
        const addData = {...tempData, '': 0};
        setTempData(addData);
    };

    //cancerl adding new tax band, revert all data to root data
    const cancelAdd = () => {
        setTempData({...taxData});
    };

    //prompt help page
    const helpClick = () => {
        setHelpFlag(!helpFlag);
    };

    return (
        <div id='tax-page-container'>
            <div id='tax-form'>
                <h1>Value-Added Tax Management</h1>
                <div id='tax-form-headers'>
                    <span>Tax Band Label</span>
                    <span>Tax Band Rate %</span>
                </div>
                <div id='tax-content'>
                    {Object.keys(tempData).length > 0 &&
                        Object.keys(tempData).sort().map((label, i) => <TaxRow key={i} data={tempData} 
                            label={label} updateTaxDB={updateTaxDB} deleteTax={deleteTax} cancelAdd={cancelAdd}
                            setRootData={setRootData} itemsData={itemsData} />)
                    }
                    <button type='button' onClick={addTaxClick}>Add Tax Rate</button>
                </div>
            </div>
            <div className='nav-footer'>
                <span className='foot-link link' onClick={helpClick}>Page Help</span>
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            {helpFlag &&
                <HelpPopUp helpClick={helpClick}>
                    <span id='help-title'>VAT Management Page</span>
                    <p className='help-para'>This page is used to add and edit VAT/Sales Tax bands and rates. Items are required to have a VAT band, although the band rate may be zero (0).</p>
                    <p className='help-para bold600'>To add a new VAT band:</p>
                    <p className='help-para'>1: Click "Add Tax Rate". This will bring up a new tax band row.</p>
                    <p className='help-para'>2. Add a band name and set the band rate in percent. The rate can be zero (0).</p>
                    <p className='help-para'>3. Click "Submit" to save the new VAT band.</p>
                    <p className='help-para bold600'>To add edit or delete an existing VAT band:</p>
                    <p className='help-para'>1. Click "Edit" on the VAT band you wish to edit or delete.</p>
                    <p className='help-para'>2. To edit, make the changes required and click "Submit" to save the changes.</p>
                    <p className='help-para'>3. To delete, click "Delete" and confirm deletion.</p>
                    <p className='help-para'></p>
                </HelpPopUp>
            }
        </div>
);
};

export default TaxManagePage;