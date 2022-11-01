const numButtons = document.querySelectorAll('.num');
const display = document.querySelector('.display');
const clearButton = document.getElementById('clear');
const operButtons = document.querySelectorAll('.oper');


function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if (b == 0) return "Well done, you broke the world.";
    else return a/b;
}

function operate(operator, a, b) { //wildly inefficient but will do for now
    switch (operator) {
        case "add":
            return add(a,b);
        case "subtract":
            return subtract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);
        default:
            alert("Not an operator");
    }
}

function displayNum(current, numButton) {
    if (current === "") {
        return numButton.textContent;
    }
    else return current + numButton.textContent;
}

function checkDecimal(str) { //returns true if there is already a decimal in the display value, false if there isn't
    for (i = 0; i<str.length; i++) {
        if (str[i] === ".") return true;
    }
    return false;
}

let displayVal = display.textContent; //value displayed on screen
let currentOper = "";
let a = null;
let temp = a;

numButtons.forEach(numButton => numButton.addEventListener('click', () => {
    if (displayVal === null) {
        displayVal = numButton.textContent;
    } 
    else if ((numButton.textContent === "." && (checkDecimal(displayVal) || displayVal === "")) || displayVal.length >= 16) { //second half of the OR statement prevents the display from overflowing
        displayVal = displayVal;
    }
    else if (temp != null) {
        displayVal = numButton.textContent;
        temp = null;
    }
    else {
        displayVal = displayVal + numButton.textContent;
    }
    display.textContent = displayVal;
}));

operButtons.forEach(operButton => operButton.addEventListener('click', () => {
    console.log(currentOper);
    if (currentOper != "") {
        displayVal = operate(currentOper, a, Number(displayVal));
        display.textContent = displayVal;
        
    }
    currentOper = operButton.id;
    a = Number(displayVal);
    temp = a;
}))

clearButton.addEventListener('click', () => { //resets everything to the beginning
    display.textContent = '';
    currentOper = '';
    displayVal = '';
    a = null;
    temp = null;
});