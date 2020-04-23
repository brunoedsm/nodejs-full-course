const numbers = [1, 2, 3, 4, 5, 6];
console.log(numbers);

const doubles = numbers.map(function(n) {
    return n * 2;
});
console.log(doubles);

// const x = n => n * 3;
// console.log(x(3));

const triples = numbers.map(n => n * 3);
console.log(triples);

const fn = (n1, n2) => {
    console.log(`${n1} + ${n2}`);
    return n1 + n2;
};

console.log(fn(2, 4));

const pairs = numbers.filter(n => n % 2 == 0);
console.log(pairs);

// const sum = numbers.reduce((ac, n) => ac + n);

const sumFn = (ac, n) => ac + n;
const sum = numbers.reduce(sumFn, 10);
console.log(sum);