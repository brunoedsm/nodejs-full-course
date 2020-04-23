// ES5 Version

// function calcTax() {
//     console.log('Calculating tax for customers with income', arguments[0]);

//     var customers = [].slice.call(arguments, 1);
//     customers.forEach(function(customer) {
//         console.log('Processing...', customer);
//     });
// }

function calcTax(income, ...customers) {
    console.log(`Calculating tax for customers with income ${income}`);
    customers.forEach(customer => console.log('Processing...', customer));
}

calcTax(50000, 'John', 'Jane', 'Mary');