function delayExecution() {
    setTimeout(function myCallback() {
        console.log('коллбек');
    }, 2000);
}

delayExecution();
