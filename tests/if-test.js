const testUtil = require('./test-util');

/**
 * [if, [exp condition], [true exp], [false exp]]
 */
module.exports = eva => {

    testUtil.test(eva,
        `(begin
            (var x 10)
            (var y 0)
            (if (> x 10) 
                (set y 20) 
                (set y 31)
            )
            y
        )`,
        31
    );

    testUtil.test(eva,
        `(begin
            (var x 10)
            (var y 0)
            (if (> x 10) 
                (set y 20) 
                (begin 
                    (var z 1)
                    (set y 2)    
                )
            )
            y
        )`,
        2
    );

    testUtil.test(eva, `
        (begin
            (var x 10)
            (if (= x 10) 100 (if (> x 10) 200 0))    
        )
    `, 100);
};