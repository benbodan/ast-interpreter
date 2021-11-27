const assert = require('assert');

const evaParser = require('../src/parser/evaParser')

function test(eva, code, expected) {
    let exp = evaParser.parse(code);
    assert.strictEqual(eva.eval(exp), expected)
}

module.exports = {
    test,
}