const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `
        (begin
            (class Point null
                (begin
                    (def constructor (this x y)
                        (begin
                            (set (prop this y) x)
                            (set (prop this x) y)
                        )
                    )
                    (def calc (this)
                        (begin
                            (+ (prop this x) (prop this y))    
                        )
                    )
                )
            )
            (var p (new Point 10 20))
            ( (prop p calc) p)
        )
    `,
        30
    )
};