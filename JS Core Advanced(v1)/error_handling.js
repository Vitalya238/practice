function checkInteger(number) {
    if (!Number.isInteger(number)) {
        throw new Error(`${number}: не целое число`);
    }
    console.log(`${number}: целое число`);
}

const numbersToCheck = [42, 3.14, "asda", -22];

numbersToCheck.forEach(number => {
    try {
        checkInteger(number);
    } catch (error) {
        console.error(error.message);
    }
});