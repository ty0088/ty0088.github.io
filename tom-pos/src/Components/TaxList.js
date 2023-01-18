import React from 'react';

const TaxList = ({itemID, taxBand, handleChange, taxData}) => {
    if (Object.keys(taxData).length > 0) {
        return (
            <select key={itemID} data-input='tax-band' defaultValue={taxBand} onChange={handleChange}>
                <option value=''></option>
                {Object.keys(taxData).sort().map((band, i) => <option key={i} value={band}>{band}</option>)}
            </select>
        );
    } else {
        return (
            <select key={itemID} data-input='tax-band'>
                <option value=''></option>
            </select>
        );
    }
};

export default TaxList;