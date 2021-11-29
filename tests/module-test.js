const testUtil = require('./test-util');

module.exports = eva => {

    testUtil.test(eva,
        `
        (begin
            (import Math "modules/Math.eva")
            ((prop Math abs) 21)    
        )
    `,
        21
    )
};