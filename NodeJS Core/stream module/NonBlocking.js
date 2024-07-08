const fs = require('fs');

function copyFileNonBlocking(source, destination) {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);
  readStream.pipe(writeStream);
}

const sourceFile = 'source.txt';
const destinationFile = 'destination.txt';

console.time('NonBlocking');
copyFileNonBlocking(sourceFile, destinationFile);
console.timeEnd('NonBlocking');
