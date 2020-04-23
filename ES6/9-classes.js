// ES5

// function Student(name) {
//     this.name = name;
// }

// Student.prototype.printName = function() {
//     console.log(this.name);
// }

//ES6

class Person {
    name;

    printName() {
        console.log(this.name);
    }
}

class Student extends Person {
    lastName;

    constructor(name) {
        super();
        this.name = name;
    }   
}

const s1 = new Student('John');
const s2 = new Student('Mary');

s1.printName();
s2.printName();