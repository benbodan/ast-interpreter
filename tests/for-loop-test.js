const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `(begin
            (var result 0)
            (for (var x 10) (> x 0) (-- x)
                (begin
                    (set result (+ result 1))  
                )
            )
            result
        )`,
        10
    );

    testUtil.test(eva,
        `(begin
            (var result 0)
            (for (var x 0) (< x 10) (++ x)
                (begin
                    (set result (+ result 1))  
                )
            )
            result
        )`,
        10
    );

};