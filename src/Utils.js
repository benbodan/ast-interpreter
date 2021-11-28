function isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isNumber(exp) {
    return typeof exp === 'number';
}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[+\-*/<>=a-zA-Z0-9_]+$/.test(exp);
}

module.exports = {
    isString,
    isNumber,
    isVariableName
}