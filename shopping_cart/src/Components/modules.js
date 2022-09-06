const checkCart = (cartArr, itemNum) => {
    return cartArr.some((obj) => obj['item num'] === itemNum)
};

export { checkCart };