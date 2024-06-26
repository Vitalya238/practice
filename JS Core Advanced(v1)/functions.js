function repeatOperation(operation, interval) {
    if (typeof operation !== 'function') {
        throw new Error('first arg not a function');
    }

    const intervalId = setInterval(operation, interval);

    return intervalId;
}

function sayHello() {
    console.log('Hello!');
}

const intervalId = repeatOperation(sayHello, 1000);

setTimeout(function () {
    clearInterval(intervalId);
    console.log('stop');
}, 5000);
