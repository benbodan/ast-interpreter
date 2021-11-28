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
    require('./lambda-functions-test'),
    require('./recursive-functions-test'),
    require('./operators-test'),
    require('./switch-test'),
    require('./for-loop-test')
];

const eva = new Eva();

tests.forEach(test => test(eva))

console.log('All Assertions Passed');