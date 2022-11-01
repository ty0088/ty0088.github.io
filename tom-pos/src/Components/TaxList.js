import React, { useState, useEffect } from 'react';
import { getDBDoc } from '../Util/firebaseDB';

const TaxList = ({itemID, taxBand, handleChange}) => {
    const [taxData, setTaxData] = useState({});

    useEffect(() => {
        const getTaxDB = async () => {
            const taxSnap = await getDBDoc('tax-bands');
            const dbData = taxSnap.data();
            setTaxData(dbData);
        };
        getTaxDB();
    }, []);

    if (Object.keys(taxData).length > 0) {
        return (
            <select key={itemID} data-input={'tax-band'} defaultValue={taxBand} onChange={handleChange}>
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