const checkCartHasItem = (cartArr, itemNum) => {
    return cartArr.some((obj) => obj['item num'] === itemNum);
};

const checkItemAvail = (shopItemsObj, cartArr, itemNum) => {
    const cartItem = cartArr.find(item => item['item num'] === itemNum);
    const shopItem = shopItemsObj[itemNum];
    if (cartItem  === undefined) {
        return true;
    } else {
        const cartQty = cartItem['qty'];
        const shopQty = shopItem["qty available"];
        if (shopQty > cartQty) {
            return true;
        } else {
            return false;
        }
    }
};

export { checkCartHasItem, checkItemAvail };