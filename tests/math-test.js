const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `(begin
            (+ 2 7)
        )`,
        9
    );

    testUtil.test(eva,
        `(begin
            (+ 2 (+ 2 3))
        )`,
        7
    );

    // 2 + 2 + 1 + 3 = 8
    testUtil.test(eva,
        `(begin
            (+ 2 (+ 2 (+ 1 3)))
        )`,
        8
    );

    // 10 - 1 = 9
    testUtil.test(eva,
        `(begin
            (- 10 1)
        )`,
        9
    );

    // 2 * 3 = 6
    testUtil.test(eva,
        `(begin
            (* 2 3)
        )`,
        6
    );

    // 2 + 3 * 2 = 8
    testUtil.test(eva,
        `(begin
            (+ 2 (* 3 2))        
        )`,
        8
    );

    // 10 / 5 / 2 = 1
    testUtil.test(eva,
        `(begin
            ( / 2 (/ 10 5))      
        )`,
        1
    );
};