const assert = require('assert');
const Enviroment = require('./Enviroment');

function isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isNumber(exp) {
    return typeof exp === 'number';
}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}

class Eva {

    constructor(global = new Enviroment()) {
        this.global = global;
    }

    eval(exp, env = this.global) {

        if (isNumber(exp)) {
            return exp;
        }

        if (isString(exp)) {
            return exp.slice(1, -1);
        }

        if (exp[0] === '+') {
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }

        if (exp[0] === '-') {
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }

        if (exp[0] === '*') {
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }

        if (exp[0] === '/') {
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }

        if (exp[0] === '>') {
            return this.eval(exp[1], env) > this.eval(exp[2], env);
        }

        if (exp[0] === '>=') {
            return this.eval(exp[1], env) >= this.eval(exp[2], env);
        }

        if (exp[0] === '<') {
            return this.eval(exp[1], env) < this.eval(exp[2], env);
        }


        if (exp[0] === '<=') {
            return this.eval(exp[1], env) <= this.eval(exp[2], env);
        }

        if (exp[0] === '==') {
            return this.eval(exp[1], env) == this.eval(exp[2], env);
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

        throw `Syntax Error "${exp}"`;
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

module.exports = Eva;