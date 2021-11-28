const assert = require('assert');
const Enviroment = require('./Enviroment');

function isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isNumber(exp) {
    return typeof exp === 'number';
}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[+\-*/<>=a-zA-Z0-9_]+$/.test(exp);
}

class Eva {

    constructor(global = GlobalEnviroment) {
        this.global = global;
    }

    eval(exp, env = this.global) {

        if (isNumber(exp)) {
            return exp;
        }

        if (isString(exp)) {
            return exp.slice(1, -1);
        }

        // Block: sequence of expressions
        if (exp[0] === 'begin') {
            const blockEnv = new Enviroment({}, env);
            return this._evalBlock(exp, blockEnv);
        }

        // Variables
        if (exp[0] === 'var') {
            return env.define(exp[1], this.eval(exp[2], env));
        }

        if (exp[0] === 'set') {
            return env.assign(exp[1], this.eval(exp[2], env));
        }

        if (exp[0] === 'if') {
            const [_tag, condition, exp_true, exp_false] = exp;
            if (this.eval(condition, env)) {
                return this.eval(exp_true, env);
            }

            return this.eval(exp_false, env);
        }

        if (isVariableName(exp)) {
            return env.lookup(exp);
        }

        if (exp[0] === 'while') {
            const [_tag, condition, body] = exp;
            let result;
            while (this.eval(condition, env)) {
                result = this.eval(body, env);
            }

            return result;
        }

        if (exp[0] === 'def') {
            const [_tag, name, params, body] = exp;

            // JIT transpile to lamda function
            const lExp = ['var', name, ['lambda', params, body]];
            return this.eval(lExp, env);
        }

        if (exp[0] === 'lambda') {
            const [_tag, params, body] = exp;

            return {
                params,
                body,
                env
            }
        }

        if (Array.isArray(exp)) {
            let fn = this.eval(exp[0], env);
            const args = exp.slice(1).map(arg => this.eval(arg, env))

            if (typeof fn === 'function') {
                return fn(...args);
            }

            // Eval User Defined Functions
            const activationRecord = {};

            fn.params.forEach((param, index) => {
                activationRecord[param] = args[index];
            });

            const activationEnv = new Enviroment(
                activationRecord,
                fn.env
            );

            return this._evalBody(fn.body, activationEnv);
        }

        throw `Syntax Error "${exp}"`;
    }


    _evalBody(body, env) {
        if (body[0] === 'begin') {
            return this._evalBlock(body, env);
        }
        return this.eval(body, env);
    }
    _evalBlock(block, env) {
        let result;
        const [_tag, ...expressions] = block;
        expressions.forEach(exp => {
            result = this.eval(exp, env);
        });
        return result;
    }
}

const GlobalEnviroment = new Enviroment({
    null: null,
    true: true,
    false: false,
    '+' (op1, op2) {
        return op1 + op2
    },
    '++' (op1) {
        return op1 + 1;
    },
    '-' (op1, op2) {
        return op1 - op2
    },
    '*' (op1, op2) {
        return op1 * op2
    },
    '/' (op1, op2) {
        return op1 / op2
    },
    '-' (op1, op2 = null) {
        if (op2 == null) {
            return -op1;
        }
        return op1 - op2
    },
    // Comparison Operators
    '=' (op1, op2) {
        return op1 == op2
    },
    '!=' (op1, op2) {
        return op1 != op2
    },
    '<' (op1, op2) {
        return op1 < op2
    },
    '<=' (op1, op2) {
        return op1 <= op2
    },
    '>' (op1, op2) {
        return op1 > op2
    },
    '>=' (op1, op2) {
        return op1 >= op2
    },
    'print' (...args) {
        console.log(...args);
    }
});

module.exports = Eva;