const isArrayEqual = (arr1, arr2) => {
    const l1 = arr1.length;
    const l2 = arr2.length;
    let result = false;
    if (l1 === l2) {
        for (let i = 0; i < l1; i++) {
            if (arr1[i] === arr2[i]) {
                result = true;
            } else {
                result = false;
                break;
            }
        }
    }
    return result;
};

// const arr1 = ['a', 'b', 'c'];
// const arr2 = ['a', 'b', 'c'];
// const arr3 = ['c', 'b', 'a'];
// const arr4 = ['a', 'b'];

// console.log(isArrayEqual(arr1, arr2)); //true
// console.log(isArrayEqual(arr2, arr1)); //true
// console.log(isArrayEqual(arr1, arr3)); //false
// console.log(isArrayEqual(arr2, arr3)); //false
// console.log(isArrayEqual(arr1, arr4)); //false

export default isArrayEqual;