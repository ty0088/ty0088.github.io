//gets the next order number in format A0000
const getNextOrderNo = (orderNos) => {
    let lastOrderNo = '';
    if (orderNos.length === 0 || orderNos === undefined) {
        //if empty db then start at order no A0001
        lastOrderNo = 'A0000';
    } else {
        //else find the last used order no
        lastOrderNo = orderNos[orderNos.length - 1];
    }
    let lastInts = parseInt(lastOrderNo.slice(1));
    let lastChar = lastOrderNo.slice(0, 1);
    //if last number is reached, then restart numbering with next lead characted, A9999 -> B0001
    if (lastInts === 9999) {
        lastInts = 0;
        lastChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
    }
    const nextInt = lastInts + 1;
    const strZero = nextInt.toString().length === 1 ? '000' : nextInt.toString().length === 2 ? '00' : nextInt.toString().length === 3 ? '0' : '';
    return `${lastChar}${strZero}${nextInt}`;
};

export default getNextOrderNo;