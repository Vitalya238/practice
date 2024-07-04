const fs = require('fs');
const path = require('path');

deleteTxtFiles();

function deleteTxtFiles() {

    fs.readdir(__dirname, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');
        let deletedCount = 0;
        files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.txt') {
                fs.unlink(path.join(__dirname, file), (err => {
                    if (err) console.log(err);
                    else {
                        console.log(`Deleted file: ${path.join(__dirname, file)}`)
                    }
                    deletedCount++;
                    if (deletedCount == txtFiles.length) {
                        getFilesInDirectory('after');
                    }
                }));
            }
        });
    });
    getFilesInDirectory('before');
}

function getFilesInDirectory(status) {
    console.log(status);
    let files =
        fs.readdirSync(__dirname);
    files.forEach(file => {
        console.log(file);
    });
}