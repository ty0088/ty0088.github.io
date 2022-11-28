const formatCurrency = (amount) => {
    //get currency settings from back end, hard coded to GBP for now ---------------
    const localeCode  = 'en-GB';
    const currencyCode = 'GBP';
    return new Intl.NumberFormat(localeCode, { style: 'currency', currency: currencyCode }).format(amount)
};

export default formatCurrency;