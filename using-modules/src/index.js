const logger = require('./log');
const Person = require('./person');

logger.info('Welcome!');

const p1 = new Person('Malaquias');
p1.printName();