const Eva = require('../src/Eva');
const Enviroment = require('../src/Enviroment');

const tests = [
    require('./eval-test'),
    require('./variable-test'),
    require('./math-test'),
    require('./block-test'),
    require('./if-test'),
    require('./while-test'),
];

const eva = new Eva(new Enviroment({
    null: null,
    true: true,
    false: false,
}));

tests.forEach(test => test(eva))

console.log('All Assertions Passed');