const numButtons = document.querySelectorAll('.num');
const display = document.querySelector('.display');
const clearButton = document.getElementById('C');
const operButtons = document.querySelectorAll('.oper');
const equalButton = document.getElementById('equals');
const deleteButton = document.getElementById('Backspace');


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
    if (b === 0) return "NO.";
    else return a/b;
}

function operate(operator, a, b) { //wildly inefficient but will do for now
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            alert("Not an operator");
    }
}

function clear() {
    display.textContent = '';
    currentOper = '';
    displayVal = '';
    a = null;
    temp = null;
}

function checkDecimal(str) { //returns true if there is already a decimal in the display value, false if there isn't
    for (i = 0; i<str.length; i++) {
        if (str[i] === ".") return true;
    }
    return false;
}

function displayNum(current, numButton) {
    if (current === "") {
        return numButton.textContent;
    }
    else return current + numButton.textContent;
}

let displayVal = display.textContent; //value displayed on screen
let currentOper = "";
let a = null;
let temp = a;
let repeat = false; //shows whether an operator has already been pressed immediately preceding a new operator button being pressed, to avoid operating multiple times on the same operator

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
    repeat = false;
}));

operButtons.forEach(operButton => operButton.addEventListener('click', () => {
    if (!repeat) { //ensures that if multiple operator buttons are pressed in a row, only the first is taken into account
        if (currentOper != "") {
            displayVal = operate(currentOper, a, Number(displayVal));
            display.textContent = ((""+displayVal).length<17 ? displayVal : Number(displayVal).toPrecision(10));
        }
        currentOper = operButton.id;
    }
    a = Number(displayVal);
    temp = a;
    repeat = true;
}))

equalButton.addEventListener('click', () => {
    if (!repeat) {
        if (currentOper != "") {
            displayVal = operate(currentOper, a, Number(displayVal));
            if (displayVal === "NO.") {
                clear();
            }
            else {
                display.textContent = ((""+displayVal).length<17 ? displayVal : Number(displayVal).toPrecision(10));
                repeat = false;
            }

        }
        currentOper = "";
    }
})

deleteButton.addEventListener('click', () => {
    displayVal = ("" + displayVal).slice(0,-1);
    display.textContent = displayVal;
})

clearButton.addEventListener('click', () => { //resets everything to the beginning
    clear();
});

document.onkeydown = function (e) { //Adds keyboard support
    switch (true) {
        case ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "-", "*", "/", "C", "Backspace"].includes(e.key):
            document.getElementById(`${e.key}`).click();
            break;
        case e.key === "=" || e.key === "Enter":
            document.getElementById('equals').click();
            break;
    }
}