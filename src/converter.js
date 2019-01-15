#!/usr/bin/env node

class Converter {
    static getParent(parent, child){
        return parent === '' || parent === undefined || parent === null
            ? `${child}`
            : `${parent}.${child}`;
    }
    
    static processJsonObject(obj, parent, result) {
        for(const entry in obj) {
            const key = entry;
            const value = obj[key];
            if(typeof value === 'object') Converter.processJsonObject(value, Converter.getParent(parent, key), result);
            else result.push(Converter.getParent(parent, key));
        }
    }
}

module.exports = Converter;