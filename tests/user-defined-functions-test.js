const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `(begin
            (def square (x)
                (begin 
                    (* x x)
                )
            )    
            (square 2)
        )`,
        4
    )

    testUtil.test(eva,
        `(begin
            (def sum (x y)
                (begin
                    (+ x y)    
                )
            )
            (sum 4 5)
        )`,
        9
    )

    testUtil.test(eva,
        `(begin
            (def sum (x y)
                (begin
                    (+ x y)    
                )
            )
            (def mul (x y)
                (begin
                    (var counter 0)
                    (var result 0)
                    (while (< counter y)
                        (begin
                            (set counter (+ counter 1))
                            (set result (sum result x))
                        )
                    )    
                    result
                )
            )
            (mul 2 30)
        )`,
        60
    )

};