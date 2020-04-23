const fs = require('fs');

const save = (name, email) => new Promise((resolve, reject) => {
    fs.appendFile('data.csv', `${name},${email}\n`, err => {
        if (err) return reject(err);
        resolve();
    });
});

const read = () => new Promise((resolve, reject) => {
    fs.readFile('data.csv', (err, data) => {
        if (err) return reject(err);

        const lines = data.toString().trim().split(/\r?\n/);
        const contacts = [];

        lines.forEach(line => {
            const [name, email] = line.split(',');
            contacts.push({ name, email })
        });

        resolve(contacts);
    });
});

module.exports = { save, read };