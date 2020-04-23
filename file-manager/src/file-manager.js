const fs = require('fs');
const path = require('path');

const reader = fileName => new Promise((resolve, reject) => {
    fs.readFile(path.resolve(`files/${fileName}.txt`), (err, data) => {
        if (err) return reject(err);

        resolve(data.toString());
    });
});

const writer = (fileName, content) => new Promise((resolve, reject) => {
    fs.appendFile(path.resolve(`files/${fileName}.txt`), content, err => {
        if (err) return reject(err);
        resolve(true);
    });
});

module.exports = {
    reader,
    writer
};