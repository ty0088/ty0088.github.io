import { checkCartHasItem } from "../Components/modules";

test ('check cart does have current item', ()  => {
    const itemNum = '1';
    const cartArr = [{"item num": "1"}];
    expect(checkCartHasItem(cartArr, itemNum)).toBe(true);
});

test ('check cart does not have current item', ()  => {
    const itemNum = '1';
    const cartArr = [{"item num": "2"}];
    expect(checkCartHasItem(cartArr, itemNum)).toBe(false);
});

test ('check cart has no items', ()  => {
    const itemNum = '1';
    const cartArr = [];
    expect(checkCartHasItem(cartArr, itemNum)).toBe(false);
});