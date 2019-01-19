#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Template {
    static templateMethod(key, namespace) {
        return `t(_: \"${namespace}:${key}\"): string;`;
    }
    static getInterface(keys, namespace) {
        return `export interface I${_1.Utils.capitalize(namespace)}Translations {
            ${keys.map(key => Template.templateMethod(key, _1.Utils.toLowerCase(namespace))).join("\n")}
        }`;
    }
    static getDeclaration(tsInterfaces, module = "strong-typed-i18n") {
        return `declare module '${module}' {
            ${tsInterfaces.reduce((x, y) => `${x}\n${y}`)}
        }`;
    }
}
exports.default = Template;
