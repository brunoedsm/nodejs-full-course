console.log(process.argv);
// process.argv.slice(2).forEach(arg => console.log(arg));

const op = process.argv[2];
const num1 = +process.argv[3];
const num2 = +process.argv[4];

let total;
switch (op) {
    case '+': total = num1 + num2; break; 
    case '-': total = num1 - num2; break; 
    case '*': total = num1 * num2; break; 
    case '/': total = num1 / num2; break; 
}

console.log(`${num1} ${op} ${num2} = ${total}`);