const log = require('./log');

class Person {
    name;

    constructor(name) {
        this.name = name;
    }

    printName() {
        log.info(this.name);
    }
}

module.exports = Person;