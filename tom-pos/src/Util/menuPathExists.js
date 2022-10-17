//check if 2 menu paths/arrays are equivalent
//equality is true if shorter array values are the same and in same order as in longer array (excluding additional values)
//if arrays lengths are equal, both order and values must be the same
const menuPathExists = (arr1, arr2) => {
    const l1 = arr1.length;
    const l2 = arr2.length;
    let result = false;
    let length = l1 <= l2 ? l1 : l2;
    for (let i = 0; i < length; i++) {
        if (arr1[i] === arr2[i]) {
            result = true;
        } else {
            result = false;
            break;
        }
    }
    return result;
};

// const arr1 = ['a', 'b', 'c'];
// const arr2 = ['a', 'b', 'c'];
// const arr3 = ['c', 'b', 'a'];
// const arr4 = ['a', 'b'];
// const arr5 = ['a'];
// const arr6 = ['a', 'c'];

// console.log(menuPathExists(arr1, arr2)); //true
// console.log(menuPathExists(arr2, arr1)); //true
// console.log(menuPathExists(arr1, arr4)); //true
// console.log(menuPathExists(arr1, arr5)); //true
// console.log(menuPathExists(arr5, arr6)); //true
// console.log(menuPathExists(arr1, arr3)); //false
// console.log(menuPathExists(arr2, arr3)); //false
// console.log(menuPathExists(arr1, arr6)); //false

export default menuPathExists;