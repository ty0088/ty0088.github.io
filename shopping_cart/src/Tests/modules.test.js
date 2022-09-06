import { checkCartHasItem, checkItemAvail } from "../Components/modules";

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

test ('item is available as not in cart', () => {
    const cartArr = [];
    const shopItemsObj = {
        "1": {
            "name": "Mittens",
            "type": "American Wirehair",
            "sex": "Male",
            "currency": "£",
            "price": 600,
            "age": "2 Months",
            "likes": "Purring, eating, playing",
            "qty available" : 1
        }
    };
    const itemNum = '1';
    expect(checkItemAvail(shopItemsObj, cartArr, itemNum)).toBe(true);
});

test ('item is no longer available as already in cart', () => {
    const cartArr = [
        {
            'item num': '1',
            'qty': 1,
            'unit price': 600,
            'total price': 600
        }
    ];
    const shopItemsObj = {
        "1": {
            "name": "Mittens",
            "type": "American Wirehair",
            "sex": "Male",
            "currency": "£",
            "price": 600,
            "age": "2 Months",
            "likes": "Purring, eating, playing",
            "qty available" : 1
        }
    };
    const itemNum = '1';
    expect(checkItemAvail(shopItemsObj, cartArr, itemNum)).toBe(false);
});

test ('item is still available even though already in cart', () => {
    const cartArr = [
        {
            'item num': '1',
            'qty': 1,
            'unit price': 600,
            'total price': 600
        }
    ];
    const shopItemsObj = {
        "1": {
            "name": "Mittens",
            "type": "American Wirehair",
            "sex": "Male",
            "currency": "£",
            "price": 600,
            "age": "2 Months",
            "likes": "Purring, eating, playing",
            "qty available" : 2
        }
    };
    const itemNum = '1';
    expect(checkItemAvail(shopItemsObj, cartArr, itemNum)).toBe(true);
});