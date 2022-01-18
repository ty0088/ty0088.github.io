function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
    return a * b;
  };

function divide(a, b) {
    return a / b;
};

function operate(operator, a, b) {
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            alert("!")
    }
};

function clear() {
    a = null;
    b = null;
    output = null;
    input = null;
    currOp = '';
    prevOp = '';
    display.textContent = '';
}

let a = null;
let b = null;
let input = '';
let output = null;
let currOp = '';
let prevOp = '';

const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');

display.textContent = '';

buttons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log(button.id);
            console.log(`Previous: a = ${a}, b = ${b}, input = ${input}, output = ${output}, operator = ${currOp}`);

            if (isNaN(parseInt(button.id))) {
                currOp = button.id;
                console.log(currOp)
                if (currOp === 'clear') {
                    clear();
                } else if (currOp === 'equals') {
                    if (a !== null && b !== null && prevOp !== '') {
                        output = operate(prevOp, a, b);
                        display.textContent = output;
                    }
                }
            } else {
                input += button.id;
                console.log(input)
                display.textContent = input;
                if (a === null && b === null && currOp === '') {
                    a = parseInt(input);
                } else if (a !== null && currOp === '' && b === null) {
                    a = parseInt(input);
                } else if (a !== null && currOp !== '' && b === null) {
                    b = parseInt(input);
                }
            }
            
            // if (a === null && b === null && operator === '') {
            //     a = input;
            // } else if (a !== null && operator !== '' && b === null) {
            //     b = input;
            // }
            
            // if (a !== null && b !== null && currOp !== '') {
            //     output = operate(currOp, a, b);
            //     display.textContent = output;
            // }
            
            console.log(`Current: a = ${a}, b = ${b}, input = ${input}, output = ${output}, operator = ${currOp}`);

        });
});



console.log(buttons);

