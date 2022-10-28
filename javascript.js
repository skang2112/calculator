const numButtons = document.querySelectorAll('.num');
const display = document.querySelector('.display');
const clearButton = document.getElementById('clear');

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

function operate(operator, a, b) {
    return operator(a,b); //Returns an error if operator not defined, but shouldn't be a problem since buttons restrict usable operators
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

numButtons.forEach(numButton => numButton.addEventListener('click', () => {
    if (displayVal === null) {
        displayVal = numButton.textContent;
    } 
    else if (numButton.textContent === "." && checkDecimal(displayVal)) {
        displayVal = displayVal;
    }
    else {
        displayVal = displayVal + numButton.textContent;
    }
    display.textContent = displayVal;
}));

clearButton.addEventListener('click', () => { 
    display.textContent = '';
    displayVal = '';
});