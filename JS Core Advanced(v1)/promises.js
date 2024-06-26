function executeSequentially(operations) {
    let promise = Promise.resolve();

    operations.forEach(operation => {
        promise = promise.then(operation);
    });

    return promise;
}

const asyncOperation1 = () => new Promise(resolve => {
    setTimeout(() => {
        console.log("1");
        resolve();
    }, 1000);
});

const asyncOperation2 = () => new Promise(resolve => {
    setTimeout(() => {
        console.log("2");
        resolve();
    }, 1000);
});

const asyncOperation3 = () => new Promise(resolve => {
    setTimeout(() => {
        console.log("3");
        resolve();
    }, 1000);
});

executeSequentially([asyncOperation1, asyncOperation2, asyncOperation3])
    .then(() => {
        console.log("Все операции завершены");
    });
