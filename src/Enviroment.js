class Enviroment {

    constructor(record = {}, parent = null) {
        this.record = record;
        this.parent = parent;
    }

    define(name, value) {
        this.record[name] = value;
        return value;
    }

    assign(name, value) {
        return this.resolve(name).record[name] = value;
    }

    lookup(name) {
        return this.resolve(name).record[name];
    }

    resolve(name) {
        if (this.record.hasOwnProperty(name)) {
            return this;
        }

        if (this.parent == null) {
            throw `"${name} is undefined"`;
        }

        return this.parent.resolve(name);
    }
}

module.exports = Enviroment