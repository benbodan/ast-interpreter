const assert = require('assert');
const Enviroment = require('./Enviroment');
const Transformer = require('./Transformer');
const { isNumber, isString, isVariableName } = require('./Utils');

class Eva {

    constructor(global = GlobalEnviroment) {
        this.global = global;
        this.transformer = new Transformer();
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
            const [_t, ref, value] = exp;

            if (ref[0] === 'prop') {
                const [_tag, instance, propName] = ref;
                const instanceEnv = this.eval(instance, env);
                return instanceEnv.define(propName, this.eval(value, env))
            }

            return env.assign(ref, this.eval(value, env));
        }

        if (exp[0] === 'if') {
            const [_tag, condition, exp_true, exp_false] = exp;
            if (this.eval(condition, env)) {
                return this.eval(exp_true, env);
            }

            return this.eval(exp_false, env);
        }

        if (exp[0] === 'switch') {
            const switchExp = this.transformer.switchToIf(exp);
            return this.eval(switchExp, env);
        }

        if (exp[0] === 'for') {
            const forExp = this.transformer.forToWhile(exp);
            return this.eval(forExp, env);
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
            const lExp = this.transformer.defToLambda(exp);
            return this.eval(lExp, env);
        }

        if (exp[0] === '++') {
            const setExp = this.transformer.transformIncToSet(exp);
            return this.eval(setExp, env);
        }

        if (exp[0] === '--') {
            const setExp = this.transformer.transformDecToSet(exp);
            return this.eval(setExp, env);
        }

        if (exp[0] === 'lambda') {
            const [_tag, params, body] = exp;

            return {
                params,
                body,
                env
            }
        }

        if (exp[0] === 'class') {
            const [_tag, name, parent, body] = exp;

            const parentEnv = this.eval(parent, env) || env;
            const classEnv = new Enviroment({}, parentEnv);

            this._evalBody(body, classEnv);
            return env.define(name, classEnv);
        }

        if (exp[0] === 'super') {
            const [_tag, className] = exp;
            return this.eval(className, env).parent;
        }

        if (exp[0] === 'new') {
            let [_tag, name, ...args] = exp;

            const classEnv = this.eval(name, env);
            const instanceEnv = new Enviroment({}, classEnv);
            args = args.map(arg => this.eval(arg, env));

            this.callUserDefinedFunction(
                classEnv.lookup('constructor'), [instanceEnv, ...args]
            );

            return instanceEnv;
        }

        if (exp[0] === 'prop') {
            const [_tag, instance, name] = exp;
            const instanceEnv = this.eval(instance, env);
            return instanceEnv.lookup(name);
        }

        if (Array.isArray(exp)) {
            let fn = this.eval(exp[0], env);
            const args = exp.slice(1).map(arg => this.eval(arg, env))

            if (typeof fn === 'function') {
                return fn(...args);
            }

            return this.callUserDefinedFunction(fn, args);
        }

        throw `Syntax Error "${exp}"`;
    }

    callUserDefinedFunction(fn, args) {
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
    '=' (op1, op2) {
        return op1 === op2
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