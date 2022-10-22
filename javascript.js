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