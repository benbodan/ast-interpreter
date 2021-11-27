const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `(print "Hello World")`
    )

    testUtil.test(eva,
        `(+ 1 2)`,
        3
    )
};