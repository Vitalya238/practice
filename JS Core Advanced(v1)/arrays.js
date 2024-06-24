function increaseByTenPercent(arr) {
    return arr.map(function(num) {
        return +(num * 1.1).toFixed(2);
    });
}

let numbers = [10, 20, 30, 40, 50];
let increasedNumbers = increaseByTenPercent(numbers);
console.log(increasedNumbers); 
