"use strict";

function factorial(n) {

    if (typeof n !== "number") {
        return;
    }
    if (n < 0) {
        return;
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;

}

console.log(factorial("asd"));
console.log(factorial(0));
console.log(factorial(-20));
console.log(factorial(3));
console.log(factorial(20)); 
