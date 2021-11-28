const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva, `
        (begin
            (def factorial (x)
                (if (= x 1)
                    1
                    (* x (factorial (- x 1)))
                )
            )
            (factorial 5)
        )
    `,
        120
    )

};