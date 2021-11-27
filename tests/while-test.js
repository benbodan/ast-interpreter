const assert = require('assert');
const testUtil = require('./test-util');

/**
 * [while, [exp condition], [body [] []]]
 */
module.exports = eva => {

    testUtil.test(eva,
        `(begin
             (var counter 0)
             (var result 0)
             (while (< counter 10)
                (begin 
                    (set counter (+ counter 1))
                    (set result (+ result 2))
                )
             )
             result
        )`,
        20
    );
};