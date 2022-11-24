import React, { useState, useEffect } from 'react';
// import { getDBDoc } from '../Util/firebaseDB';

const TaxList = ({itemID, taxBand, handleChange, taxData}) => {
    // const [taxData, setTaxData] = useState({}); //change from state to prop ---------------

    // //get taxData from Parent ---------------
    // useEffect(() => {
    //     const getTaxDB = async () => {
    //         const taxSnap = await getDBDoc('tax-bands');
    //         const dbData = taxSnap.data();
    //         setTaxData(dbData);
    //     };
    //     getTaxDB();
    // }, []);

    if (Object.keys(taxData).length > 0) {
        return (
            <select key={itemID} data-input={'tax-band'} defaultValue={taxBand} onChange={handleChange}>
                <option value={''}></option>
                {Object.keys(taxData).sort().map((band, i) => <option key={i} value={band}>{band}</option>)}
            </select>
        );
    } else {
        return (
            <select id={`tax-list-${itemID}`}>
                <option value={'N/A'}>N/A</option>
            </select>
        );
    }
};

export default TaxList;