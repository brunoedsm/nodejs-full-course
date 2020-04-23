function getStock() {
    return {
        symbol: 'IBM',
        price: 100
    };
}

// ES5 
// const stock = getStock();
// const symbol = stock.symbol;
// const price = stock.price;

// ES6
const { symbol, price } = getStock();
console.log(symbol, price);

const [name1, name2] = ['John', 'Jane'];
console.log(name1, name2);

const names = ['John', 'Jane', 'Mary', 'Lou'];
const [first, second, ...others] = names;
console.log(first, second, others);

let a = 4;
let b = 10;

[a, b] = [b, a];
console.log(a, b);


function clickHandler({target}) {
    console.log(target);
}

clickHandler({target: 'x', clickY: 10, clickX: 20});