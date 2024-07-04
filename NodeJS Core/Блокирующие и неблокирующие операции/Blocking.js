const fs = require('fs');

function copyFileBlocking(source, destination) {
    const data = fs.readFileSync(source);
    fs.writeFileSync(destination, data);
}

const sourceFile = 'source.txt';
const destinationFile = 'destination.txt';

console.time('Blocking');
copyFileBlocking(sourceFile, destinationFile);
console.timeEnd('Blocking');
