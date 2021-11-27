const assert = require('assert');
const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `(var x 21)`,
        21
    );

    testUtil.test(eva,
        `x`,
        21
    );

    testUtil.test(eva,
        `(set x 11)`,
        11
    );

    testUtil.test(eva,
        `x`,
        11
    );

    testUtil.test(eva,
        `true`,
        true
    );

    testUtil.test(eva,
        `false`,
        false
    );

    testUtil.test(eva,
        `(var isActive true)`,
        true
    );

    testUtil.test(eva,
        `isActive`,
        true
    );

    testUtil.test(eva,
        `(set isActive false)`,
        false
    );

    testUtil.test(eva,
        `isActive`,
        false
    );

    testUtil.test(eva,
        `(begin
            (var x 10)
            (var y 12)
            (var y (+ x y))
            y
        )`,
        22
    );
};