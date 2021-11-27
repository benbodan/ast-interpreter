const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `
        (begin
            (var x 11)
            (var y 10)
            (+ x y)    
        )
    `,
        21
    )

    testUtil.test(eva,
        `
        (begin
            (var x 41)
            (begin
                (var x 20)
                x
            )
            x
        )
    `,
        41
    )

    testUtil.test(eva,
        `
        (begin
            (var x 12)
            (begin 
                (var y 20)
                (+ x y)    
            )
        )
    `,
        32
    )

    testUtil.test(eva,
        `
        (begin
            (var  x 12)
            (begin 
                (set x  20)    
            )
        )
    `,
        20
    )
};