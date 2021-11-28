const testUtil = require('./test-util');

module.exports = eva => {
    testUtil.test(eva,
        `(begin
            (var x 10)
            (switch 
                ((= x 10) 100)
                ((> x 10) 200)
                (else 0)
            )
        )
        `,
        100
    );

    testUtil.test(eva,
        `(begin
            (var x 11)
            (switch 
                ((= x 10) 100)
                ((> x 10) 200)
                (else 0)
            )
        )
        `,
        200
    );

    testUtil.test(eva,
        `(begin
            (var x 9)
            (switch 
                ((= x 10) 100)
                ((> x 10) 200)
                (else 0)
            )
        )
        `,
        0
    );

    testUtil.test(eva,
        `(begin
            (var x 5)
            (switch 
                ((<= x 1) 2)
                ((<= x 2) 3)
                ((<= x 3) 4)
                ((<= x 4) 5)
                ((<= x 5) 6)
                ((<= x 6) 7)
                (else 0)
            )
        )
        `,
        6
    );
};