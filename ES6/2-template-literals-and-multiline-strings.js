// ES Version
// const name = 'John';
// console.log('Hello, ' + name);

const name = `John`;
console.log(`Hello, ${name}`);
console.log(`2 + 2 = ${2 + 2}`);

console.log('a', 'b', 'c');

// let tpl = '<div>\n'+
//     '\t<p>' + name + '</p>\n' +
// '</div>';
// console.log(tpl);

const tpl = `
    <div>
        <p>${name}</p>
    </div>
`;
console.log(tpl);