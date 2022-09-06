import { checkCart } from "../Components/modules";

test ('checkCart does have current item', ()  => {
    const itemNum = '1';
    const cartArr = [{"item num": "1"}];
    expect(checkCart(cartArr, itemNum)).toBe(true);
});

test ('checkCart does not have current item', ()  => {
    const itemNum = '1';
    const cartArr = [{"item num": "2"}];
    expect(checkCart(cartArr, itemNum)).toBe(false);
});

test ('checkCart has no items', ()  => {
    const itemNum = '1';
    const cartArr = [];
    expect(checkCart(cartArr, itemNum)).toBe(false);
});