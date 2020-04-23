// var name = 'John';
let name = 'Jane';

console.log(name);

const pi = 3.14;
// pi = 5;

let customer = 'John Doe';

(function() {
    console.log('The name of the customer inside the function is ', customer);

    if (true) {
        let customer = 'Jane Doe';
        console.log('The nae of the customer inside the block is ', customer);
    }

})();

console.log('The name of the customer outside the function is ', customer);