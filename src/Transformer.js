class Transformer {
    constructor() {

    }

    defToLambda(defExp) {
        const [_tag, name, params, body] = defExp;
        return ['var', name, ['lambda', params, body]];
    }

    forToWhile(exp) {
        let [_tag, init, condition, modifier, body] = exp;
        let exps = ['begin'];


        if (body[0] === 'begin') {
            body.push(modifier);
        } else {
            body = ['begin', body, modifier]
        }

        exps.push(init);
        exps.push(['while', condition, body])

        return exps;
    }

    transformIncToSet(exp) {
        const [_tag, name] = exp;
        return ['set', name, ['+', name, 1]];
    }

    transformDecToSet(exp) {
        const [_tag, name] = exp;
        return ['set', name, ['-', name, 1]];
    }

    switchToIf(exp) {
        const [_tag, ...cases] = exp;
        const ifExp = ['if', null, null, null];

        let current = ifExp;

        for (let i = 0; i < cases.length - 1; i++) {
            const [currentCond, currentBlock] = cases[i];

            current[1] = currentCond;
            current[2] = currentBlock;

            const next = cases[i + 1];
            const [nextCond, nextBlock] = next;

            current[3] = nextCond === 'else' ? nextBlock : ['if'];
            current = current[3]
        }
        return ifExp;
    }

}

module.exports = Transformer;