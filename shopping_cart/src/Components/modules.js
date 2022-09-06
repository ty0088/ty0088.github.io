const checkCartHasItem = (cartArr, itemNum) => {
    return cartArr.some((obj) => obj['item num'] === itemNum);
};

export { checkCartHasItem };