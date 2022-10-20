const menuInputCheck = (input, menuData) => {
    const restrictedArr = ['--Add Menu--', 'Menu', 'N/A'];
    Object.keys(menuData).forEach(level => Object.keys(menuData[level]).forEach(menu => restrictedArr.push(menu)));
    if (restrictedArr.includes(input)) {
        return false;
    } else {
        return true;
    }
};

export default menuInputCheck;