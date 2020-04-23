const line = [0, 0, 2, 0, 2];
const a = [2, 4, ...line, 12];

console.log(a);

const sorted = [
    ...line.filter(n => n == 0),
    ...line.filter(n => n != 0)
];
console.log(sorted);

const person = {
    name: 'Mary',
    lastName: 'Smith'
};

// const clone = person;
// clone.lastName = 'Doe';

// const clone = Object.assign({}, person);
// clone.lastName = 'Doe';

// const clone = Object.assign({}, person, {
//     lastName: 'Doe'
// });

// const clone = {...person};
// clone.lastName = 'Doe';

const clone = {age: 30, ...person, lastName: 'Doe'};

console.log(person, clone);