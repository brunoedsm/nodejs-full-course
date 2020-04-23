const fs = require('fs');
const path = require('path');

// fs.open(path.resolve('data/file.txt'), 'r', (err, file) => {
//     if (err) {
//         console.log('ERROR', err);
//         return;
//     }

//     console.log(file);
// });

// fs.readFile('data/file.txt', (err, data) => {
//     if (err) {
//         console.log('ERROR', err);
//         return;
//     }

//     console.log(data.toString());
// });

// console.log(fs.readFileSync('data/file.txt').toString());
// console.log('Reading...');

// fs.appendFile('data/file.txt', `\nAnother line on file`, err => {
//     if (err) {
//         console.log('ERROR', err);
//         return;
//     }

//     console.log('Write line on file');
// });

const readDataFile = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        });
    });
}

readDataFile('data/file.txt')
    .then(res => console.log(res))
    .catch(err => console.log(err));