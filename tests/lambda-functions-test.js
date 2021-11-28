const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `((lambda (x) (* 2 x)) 2)`,
        4
    )

    testUtil.test(eva, `
        (begin
            (def onClick (callback) 
                (begin
                    (var x 10 )
                    (var y 20)
                    (callback (+ x y)) 
                )
            )

            (var x (onClick (lambda (d) (* d 10)) ))
        )
    
    `, 300);

    testUtil.test(eva, `
    
    (begin
        (var sum (lambda (x y) (+ x y) ))
        (sum 11 10)
    )

    `, 21);


    testUtil.test(eva, `
    
    (begin
        (var sum (lambda (x y) (+ x y) ))
        (var square (lambda (x) (* x x)))
        (square (sum 1 1))
    )
    `, 4);
};