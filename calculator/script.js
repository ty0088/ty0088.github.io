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
            if (b === 0) {
                alert("Can't divide by 0...");
                return 0;
            } else {
                return divide(a, b);
            }
        default:
            alert("!")
    }
};

function clear() {
    a = null;
    b = null;
    input = '';
    output = null;
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
            console.log(`Previous: a = ${a}, b = ${b}, input = ${input}, output = ${output}, operator = ${prevOp}`);

            if (isNaN(parseInt(button.id))) {   //check whether a number button or operator button is pressed

                if (button.id === 'clear') {

                    clear();

                } else if (button.id === 'back') {

                    input = input.slice(0,-1);
                    display.textContent = input;

                } else if (input === '' && a !== null) {    //changing operators

                    if (currOp !== '.') {
                        prevOp = currOp;
                    }
                    currOp = button.id;

                } else if (input !== '' && currOp !== 'equals') {   //do calc or clear
                    
                    if (currOp !== '.') {   //stops decimal point being used as an operator
                        prevOp = currOp;
                    }
                    currOp = button.id;

                    if (currOp === 'clear') {

                        clear();

                    } else if (currOp === '.') {
                        
                        if (!input.includes('.')) {
                            input += button.id;
                            display.textContent = input;
                        }

                    } else if (a !== null && currOp === 'equals') {
                        
                        b = parseFloat(input);
                        input = '';
                        output = operate(prevOp, a, b);
                        display.textContent = output;
                        a = output;
                        b = null;

                    } else {
                        //if add, minus, multiply or divide is pressed
                        if (a === null && b === null) {

                            a = parseFloat(input);
                            input = '';

                        } else if (a !== null && b === null) {

                            b = parseFloat(input);
                            input = '';
                            output = operate(prevOp, a, b);
                            display.textContent = output;
                            a = output;
                            b = null;

                        }                        
                    }

                } 
                
            } else {

                if (currOp === 'equals') {  //user must choose an valid operator before entering any further numbers

                    alert('Chose a valid operator (add, subtract, multiply, divide, clear)!');

                } 
                                
                else {

                    input += button.id;
                    display.textContent = input;

                }
                

            }
            
            console.log(`Current: a = ${a}, b = ${b}, input = ${input}, output = ${output}, operator = ${currOp}`);

        });
});



console.log(buttons);

