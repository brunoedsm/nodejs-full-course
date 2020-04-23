function* doSomething() {
    console.log('Start processing...');
    yield 50;
    console.log('Resumed processing...');
}

const generator = doSomething();
// console.log(generator.next());
// console.log('continue');
// console.log(generator.next());

while (!generator.next().done) {
    // ...    
}

function* getStockPrice(symbol) {
    while (true) {
        yield (Math.random() * 100).toFixed(2);
        console.log(`Resuming for ${symbol}`);
    }
}

const priceGenerator = getStockPrice('IBM');
const limitPrice = 15;
let price = priceGenerator.next().value;

while (price > limitPrice) {
    price = priceGenerator.next().value;
    console.log(`The generator returned ${price}`);
}

console.log(`Buying at ${price}!`);