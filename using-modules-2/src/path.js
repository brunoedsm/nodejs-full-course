const path = require('path'); 

console.log(path.resolve('./'));

const filePath = path.resolve('./data/file.txt');
console.log(filePath);

console.log(path.basename(filePath, '.txt'));

console.log(path.join('foo', 'bar'));

console.log(path.extname(filePath));