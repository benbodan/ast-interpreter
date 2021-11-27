const Eva = require('../src/Eva');
const Enviroment = require('../src/Enviroment');

const tests = [
    require('./eval-test'),
    require('./variable-test'),
    require('./math-test'),
    require('./block-test'),
    require('./if-test'),
    require('./while-test'),
    require('./built-in-functions-test'),
    require('./user-defined-functions-test'),
];

const eva = new Eva();

tests.forEach(test => test(eva))

console.log('All Assertions Passed');