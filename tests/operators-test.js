const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva, `
    (begin
        (var x 10)
        (if (= x 10) (+ x 10) (- x 1))    
    )
    `, 20)

    testUtil.test(eva, `
    (begin
        (var x 10)
        (if (> x 10) 1 2)    
    )
    `, 2)

    testUtil.test(eva, `
    (begin
        (var x 10)
        (if (>= x 10) 1 2)    
    )
    `, 1)

    testUtil.test(eva, `
    (begin
        (var x 10)
        (if (< x 10) 1 2)    
    )
    `, 2)

    testUtil.test(eva, `
    (begin
        (var x 10)
        (if (<= x 10) 1 2)    
    )
    `, 1)
};